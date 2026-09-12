"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/cpus";
import type { Ram } from "@/lib/rams";
import { RamCard } from "./ram-card";

type RamPickerProps = {
  rams: Ram[];
  cpuSlug: string;
  boardSlug: string;
  slots: number;
};

export function RamPicker({ rams, cpuSlug, boardSlug, slots }: RamPickerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [sticks, setSticks] = useState(() => Math.min(2, slots));
  const [vendor, setVendor] = useState<string | null>(null);

  const vendors = [...new Set(rams.map((ram) => ram.vendor))].sort();
  const visibleRams = vendor
    ? rams.filter((ram) => ram.vendor === vendor)
    : rams;
  const selectedRam = rams.find((ram) => ram.slug === selectedSlug) ?? null;
  const totalPrice = selectedRam ? selectedRam.price * sticks : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setVendor(null)}
          className={
            vendor === null
              ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
              : "rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          }
        >
          Все
        </button>
        {vendors.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setVendor((prev) => (prev === item ? null : item))}
            className={
              vendor === item
                ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                : "rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleRams.map((ram) => (
          <RamCard
            key={ram.slug}
            ram={ram}
            selected={selectedSlug === ram.slug}
            onSelect={(slug) =>
              setSelectedSlug((prev) => (prev === slug ? null : slug))
            }
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-xl space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        {selectedRam ? (
          <>
            <div className="space-y-1 text-center">
              <p className="text-sm font-semibold">{selectedRam.name}</p>
              <p className="text-xs text-muted-foreground">
                Слотов на плате: {slots}
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="sticks-range"
                className="block text-center text-sm font-medium"
              >
                Количество плашек: {sticks}
              </label>
              <input
                id="sticks-range"
                type="range"
                min={1}
                max={slots}
                step={1}
                value={sticks}
                onChange={(event) => setSticks(Number(event.target.value))}
                className="w-full cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>1 плашка</span>
                <span>{slots} слотов</span>
              </div>
            </div>
            <p className="text-center text-lg font-bold">
              {sticks} × {formatPrice(selectedRam.price)} ={" "}
              {formatPrice(totalPrice)}
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="px-10">
                <Link
                  href={`/gpu?cpu=${cpuSlug}&board=${boardSlug}&ram=${selectedRam.slug}&sticks=${sticks}`}
                >
                  Продолжить
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Выберите оперативную память, чтобы настроить количество плашек
          </p>
        )}
      </div>
    </div>
  );
}
