import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  formatPrice,
  marketplaceLinks,
  type Cpu,
} from "@/lib/cpus";

type CpuCardProps = {
  cpu: Cpu;
  selected: boolean;
  onSelect: (slug: string) => void;
};

export function CpuCard({ cpu, selected, onSelect }: CpuCardProps) {
  return (
    <div
      className={
        selected
          ? "flex flex-col overflow-hidden rounded-xl border-2 border-primary bg-card shadow-sm transition-shadow hover:shadow-md"
          : "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
      }
    >
      <div className="flex flex-col items-center gap-2 bg-muted px-3 pb-3 pt-3">
        <div className="relative aspect-square w-1/2 overflow-hidden rounded-lg">
          <Image
            src={cpu.image}
            alt={`Процессор ${cpu.name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
            className="object-cover"
          />
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(cpu.slug)}
            className="h-4 w-4 cursor-pointer accent-primary"
          />
          Выбрать
        </label>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {cpu.brand} · {cpu.socket}
          </p>
          <h3 className="text-sm font-semibold leading-snug">{cpu.name}</h3>
        </div>
        <ul className="space-y-0.5 text-xs text-muted-foreground">
          <li>
            Ядер: {cpu.cores} / потоков: {cpu.threads}
          </li>
          <li>Частота: {cpu.clock}</li>
        </ul>
        <p className="text-base font-bold">{formatPrice(cpu.price)}</p>
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          {marketplaceLinks(cpu.name).map((shop) => (
            <a
              key={shop.label}
              href={shop.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-md border border-border px-1.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">{shop.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
