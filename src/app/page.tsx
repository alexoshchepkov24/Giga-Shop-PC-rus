import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="max-w-3xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              GigaShop
            </h1>
            <p className="text-lg text-muted-foreground">
              Соберите идеальный ПК: процессор, видеокарта, память и всё остальное
            </p>
          </div>
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link href="/build">Начать сборку</Link>
          </Button>
          <Image
            src="/hero-pc.webp"
            alt="Игровой компьютер с открытым корпусом и подсветкой компонентов"
            width={1200}
            height={800}
            priority
            className="mx-auto w-full max-w-xl rounded-2xl border border-border object-cover shadow-2xl"
          />
          <p className="text-sm text-muted-foreground">номер создателя: +79620714192</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mb-4 flex items-center justify-center">
        <div className="flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-neutral-100">
          <Logo className="h-5 w-auto" />
        </div>
      </footer>
    </div>
  );
}
