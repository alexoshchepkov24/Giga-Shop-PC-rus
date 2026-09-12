import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { formatPrice, marketplaceLinks } from "@/lib/cpus";
import type { Ram } from "@/lib/rams";

type RamCardProps = {
  ram: Ram;
  selected: boolean;
  onSelect: (slug: string) => void;
};

export function RamCard({ ram, selected, onSelect }: RamCardProps) {
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
            src={ram.image}
            alt={`Оперативная память ${ram.name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
            className="object-cover"
          />
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(ram.slug)}
            className="h-4 w-4 cursor-pointer accent-primary"
          />
          Выбрать
        </label>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {ram.vendor} · {ram.memoryType}
          </p>
          <h3 className="text-sm font-semibold leading-snug">{ram.name}</h3>
        </div>
        <ul className="space-y-0.5 text-xs text-muted-foreground">
          <li>Объём плашки: {ram.capacity} ГБ</li>
          <li>Частота: {ram.speed}</li>
        </ul>
        <p className="text-base font-bold">{formatPrice(ram.price)} / плашка</p>
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          {marketplaceLinks(ram.name).map((shop) => (
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
