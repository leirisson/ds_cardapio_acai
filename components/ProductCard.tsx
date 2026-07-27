import Image from "next/image";
import { GlassCard } from "./GlassCard";
import { Product } from "../lib/types";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <GlassCard className="group flex flex-col gap-4 p-4 transition-shadow hover:shadow-md sm:flex-row sm:gap-6">
      <div className="h-40 w-full shrink-0 overflow-hidden rounded-lg bg-surface-container-low sm:h-auto sm:w-36 lg:w-48">
        <Image
          src={product.imagem}
          alt={product.nome}
          width={192}
          height={192}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <h3 className="font-display text-lg text-primary sm:text-xl">{product.nome}</h3>
            <div className="text-right shrink-0">
              <div className="font-bold text-secondary">
                {formatCurrency(product.preco)}
                {product.precoMix && (
                  <span className="ml-1 text-xs font-normal text-on-surface-variant">
                    (Açaí)
                  </span>
                )}
              </div>
              {product.precoMix && (
                <div className="font-bold text-secondary">
                  {formatCurrency(product.precoMix)}
                  <span className="ml-1 text-xs font-normal text-on-surface-variant">
                    (+ Mix)
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="mb-4 flex items-center gap-2 text-sm text-on-surface-variant">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-secondary"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            {product.descricao}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:bg-primary-container hover:text-on-primary-container active:scale-95 sm:w-max"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M3 3a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 13.75 4.51 16 6.414 16H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 5H6.28l-.31-1.243A1 1 0 005 3H3zM16 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Adicionar
        </button>
      </div>
    </GlassCard>
  );
}
