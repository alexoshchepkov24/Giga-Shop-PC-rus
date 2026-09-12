"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Motherboard } from "@/lib/motherboards";
import { MotherboardCard } from "./motherboard-card";

type MotherboardPickerProps = {
  boards: Motherboard[];
  cpuSlug: string;
};

export function MotherboardPicker({ boards, cpuSlug }: MotherboardPickerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [vendor, setVendor] = useState<string | null>(null);

  const vendors = [...new Set(boards.map((board) => board.vendor))].sort();
  const visibleBoards = vendor
    ? boards.filter((board) => board.vendor === vendor)
    : boards;

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
        {visibleBoards.map((board) => (
          <MotherboardCard
            key={board.slug}
            board={board}
            selected={selectedSlug === board.slug}
            onSelect={(slug) =>
              setSelectedSlug((prev) => (prev === slug ? null : slug))
            }
          />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        {selectedSlug ? (
          <Button asChild size="lg" className="px-10">
            <Link href={`/ram?cpu=${cpuSlug}&board=${selectedSlug}`}>
              Продолжить
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        ) : (
          <Button size="lg" className="px-10" disabled>
            Продолжить
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
}
