import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cpus } from "@/lib/cpus";
import { motherboardsForSocket } from "@/lib/motherboards";
import { MotherboardPicker } from "./_components/motherboard-picker";

export const metadata: Metadata = {
  title: "Выбор материнской платы | GigaShop",
  description:
    "Выберите материнскую плату, совместимую с вашим процессором: сокет, вид платы, вид SSD и разъёмы, цены и ссылки на Ozon, Wildberries и AliExpress",
};

export default async function MotherboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cpuSlug = typeof params.cpu === "string" ? params.cpu : undefined;
  const cpu = cpus.find((item) => item.slug === cpuSlug);

  if (!cpu) {
    return (
      <div className="min-h-screen">
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/build">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                К процессорам
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">Шаг 2 из сборки: материнская плата</p>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Сначала выберите процессор
          </h1>
          <p className="mt-3 text-muted-foreground">
            Материнская плата подбирается под сокет процессора
          </p>
          <Button asChild className="mt-6">
            <Link href="/build">Выбрать процессор</Link>
          </Button>
        </main>
      </div>
    );
  }

  const boards = motherboardsForSocket(cpu.socket);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/build">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              К процессорам
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Шаг 2 из сборки: материнская плата</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Какую материнскую плату вы хотите использовать?
          </h1>
          <p className="text-muted-foreground">
            Подобраны только платы, совместимые с вашим процессором по сокету
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm">
          <Cpu className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="font-medium">{cpu.name}</span>
          <span className="text-muted-foreground">· сокет {cpu.socket}</span>
        </div>

        <MotherboardPicker boards={boards} cpuSlug={cpu.slug} />
      </main>
    </div>
  );
}
