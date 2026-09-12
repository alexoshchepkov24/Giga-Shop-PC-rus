import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cpus } from "@/lib/cpus";
import { motherboards } from "@/lib/motherboards";
import { parseBoardMemory, ramsForMemoryType } from "@/lib/rams";
import { RamPicker } from "./_components/ram-picker";

export const metadata: Metadata = {
  title: "Выбор оперативной памяти | GigaShop",
  description:
    "Выберите оперативную память, совместимую с вашей материнской платой: тип DDR4/DDR5, объём, частота и количество плашек",
};

export default async function RamPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cpuSlug = typeof params.cpu === "string" ? params.cpu : undefined;
  const boardSlug = typeof params.board === "string" ? params.board : undefined;
  const board = motherboards.find((item) => item.slug === boardSlug);

  if (!board) {
    return (
      <div className="min-h-screen">
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/motherboard">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                К материнским платам
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">Шаг 3 из сборки: оперативная память</p>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Сначала выберите материнскую плату
          </h1>
          <p className="mt-3 text-muted-foreground">
            Тип и количество памяти подбираются под материнскую плату
          </p>
          <Button asChild className="mt-6">
            <Link href="/motherboard">Выбрать материнскую плату</Link>
          </Button>
        </main>
      </div>
    );
  }

  const cpu = cpus.find((item) => item.slug === cpuSlug);
  const memory = parseBoardMemory(board.memory);
  const rams = ramsForMemoryType(memory.type);
  const backHref = cpuSlug ? `/motherboard?cpu=${cpuSlug}` : "/motherboard";

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              К материнским платам
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Шаг 3 из сборки: оперативная память</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Сколько оперативной памяти вам нужно?
          </h1>
          <p className="text-muted-foreground">
            Показаны только модули, совместимые с вашей материнской платой по типу памяти
          </p>
        </div>

        <div className="mx-auto mb-8 flex max-w-xl flex-wrap items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm">
          <CircuitBoard className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="font-medium">{board.name}</span>
          <span className="text-muted-foreground">
            · память {memory.type}, слотов: {memory.slots}
          </span>
        </div>

        <RamPicker
          rams={rams}
          cpuSlug={cpuSlug ?? ""}
          boardSlug={board.slug}
          slots={memory.slots}
        />
      </main>
    </div>
  );
}
