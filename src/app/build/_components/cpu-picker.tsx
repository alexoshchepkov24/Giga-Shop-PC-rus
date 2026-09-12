"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cpu } from "@/lib/cpus";
import { CpuCard } from "./cpu-card";

export function CpuPicker({ cpus }: { cpus: Cpu[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);

  const brands = [...new Set(cpus.map((cpu) => cpu.brand))].sort();
  const visibleCpus = brand
    ? cpus.filter((cpu) => cpu.brand === brand)
    : cpus;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setBrand(null)}
          className={
            brand === null
              ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
              : "rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          }
        >
          Все
        </button>
        {brands.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setBrand((prev) => (prev === item ? null : item))}
            className={
              brand === item
                ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                : "rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleCpus.map((cpu) => (
          <CpuCard
            key={cpu.slug}
            cpu={cpu}
            selected={selectedSlug === cpu.slug}
            onSelect={(slug) =>
              setSelectedSlug((prev) => (prev === slug ? null : slug))
            }
          />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        {selectedSlug ? (
          <Button asChild size="lg" className="px-10">
            <Link href={`/motherboard?cpu=${selectedSlug}`}>
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
