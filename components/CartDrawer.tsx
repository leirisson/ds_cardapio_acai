import Image from "next/image";
import { GlassCard } from "./GlassCard";
import { CartItem } from "../lib/types";
import { cartTotal, itemUnitPrice } from "../lib/store/cart";

type CartDrawerProps = {
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (cartItemId: string) => void;
  onCheckout: () => void;
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const selectionSummary = (item: CartItem) =>
  [
    item.selection.sabor,
    ...item.selection.acompanhamentos,
    item.selection.calda,
    ...item.selection.frutas,
  ]
    .filter(Boolean)
    .join(", ");

export function CartDrawer({ items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const total = cartTotal(items);

  return (
    <GlassCard className="flex flex-col gap-4 rounded-xl p-6 md:sticky md:top-24">
      <h2 className="font-display text-xl text-primary">Seu Carrinho</h2>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-on-surface-variant">
          Seu carrinho está vazio.
        </p>
      ) : (
        <ul className="flex max-h-96 flex-col gap-1 overflow-y-auto custom-scrollbar pr-1">
          {items.map((item) => (
            <li
              key={item.cartItemId}
              className="group flex items-start gap-3 border-b border-surface-container-highest py-3 last:border-b-0"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-container">
                <Image
                  src={item.product.imagem}
                  alt={item.product.nome}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-on-surface">{item.product.nome}</p>
                {selectionSummary(item) && (
                  <p className="mt-0.5 text-xs text-on-surface-variant">{selectionSummary(item)}</p>
                )}
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-high text-xs text-on-surface-variant hover:bg-surface-container-highest"
                    aria-label="Diminuir quantidade"
                  >
                    -
                  </button>
                  <span className="w-4 text-center text-xs text-on-surface-variant">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-high text-xs text-on-surface-variant hover:bg-surface-container-highest"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-secondary">
                  {formatCurrency(itemUnitPrice(item) * item.quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.cartItemId)}
                  className="text-outline transition-colors hover:text-error"
                  aria-label="Remover item"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex items-center justify-between border-t border-surface-container-highest pt-4">
        <span className="text-on-surface-variant">Total</span>
        <span className="font-display text-2xl text-secondary">{formatCurrency(total)}</span>
      </div>

      <button
        type="button"
        disabled={items.length === 0}
        onClick={onCheckout}
        className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-bold text-on-secondary shadow-lg transition-colors hover:bg-secondary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Finalizar Compra
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
          <path
            fillRule="evenodd"
            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </GlassCard>
  );
}
