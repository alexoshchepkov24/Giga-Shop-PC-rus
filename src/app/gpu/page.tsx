import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Выбор видеокарты | GigaShop",
  description: "Шаг 4 сборки ПК — выбор видеокарты",
};

export default async function GpuPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cpuSlug = typeof params.cpu === "string" ? params.cpu : undefined;
  const boardSlug = typeof params.board === "string" ? params.board : undefined;
  const ramSlug = typeof params.ram === "string" ? params.ram : undefined;
  const backHref =
    ramSlug && boardSlug
      ? `/ram?cpu=${cpuSlug ?? ""}&board=${boardSlug}`
      : "/motherboard";

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              К оперативной памяти
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">Шаг 4 из сборки: видеокарта</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Выбор видеокарты
        </h1>
        <p className="mt-3 text-muted-foreground">
          Раздел готовится — скоро здесь появится каталог видеокарт.
        </p>
      </main>
    </div>
  );
}
