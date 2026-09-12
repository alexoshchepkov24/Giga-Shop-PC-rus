import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cpus } from "@/lib/cpus";
import { CpuPicker } from "./_components/cpu-picker";

export const metadata: Metadata = {
  title: "Выбор процессора | GigaShop",
  description:
    "Выберите процессор для сборки ПК: характеристики, цены и ссылки на Ozon, Wildberries и AliExpress",
};

export default function BuildPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              На главную
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Шаг 1 из сборки: процессор</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Какой процессор вы хотите использовать?
          </h1>
          <p className="text-muted-foreground">
            Выберите подходящую модель — под карточкой указаны характеристики и где купить
          </p>
        </div>

        <CpuPicker cpus={cpus} />
      </main>
    </div>
  );
}
