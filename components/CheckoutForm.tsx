import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "./GlassCard";
import { CartItem, DeliveryMethod, PaymentMethod } from "../lib/types";
import { cartTotal } from "../lib/store/cart";

type CheckoutFormProps = {
  items: CartItem[];
  onSubmit: (deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod, changeFor?: number, notes?: string) => void;
  onBack: () => void;
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-white p-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10";

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-8 w-8" aria-hidden>
      <path d="M3 7h11v8H3z" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v2h-7z" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-8 w-8" aria-hidden>
      <path d="M4 9.5 5 4h14l1 5.5" strokeLinejoin="round" />
      <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" strokeLinejoin="round" />
      <path d="M5 10v9h14v-9" strokeLinejoin="round" />
      <path d="M10 19v-5h4v5" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  );
}

function PixIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden>
      <path d="M8.5 8.5 5.7 11.3a2.4 2.4 0 0 0 0 3.4l2.8 2.8a2.4 2.4 0 0 0 3.4 0l1.9-1.9" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M15.5 15.5l2.8-2.8a2.4 2.4 0 0 0 0-3.4l-2.8-2.8a2.4 2.4 0 0 0-3.4 0l-1.9 1.9" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M9.5 9.5h5v5h-5z" strokeLinejoin="round" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden>
      <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M6 9.5v0M18 14.5v0" strokeLinecap="round" />
    </svg>
  );
}

const paymentOptions: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "cartao", label: "Cartão de Crédito", icon: <CardIcon /> },
  { id: "pix", label: "Pix", icon: <PixIcon /> },
  { id: "dinheiro", label: "Dinheiro", icon: <CashIcon /> },
];

export function CheckoutForm({ items, onSubmit, onBack }: CheckoutFormProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cartao");
  const [changeFor, setChangeFor] = useState("");
  const [notes, setNotes] = useState("");

  const total = cartTotal(items);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      deliveryMethod,
      paymentMethod,
      paymentMethod === "dinheiro" && changeFor ? Number(changeFor) : undefined,
      notes || undefined
    );
  };

  return (
    <form className="grid grid-cols-1 gap-8 lg:grid-cols-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 lg:col-span-7">
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-primary">
            <DeliveryIcon />
            Forma de Entrega
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 transition-all active:scale-[0.98] ${
                deliveryMethod === "delivery"
                  ? "border-secondary-container bg-secondary-container/10"
                  : "border-outline-variant bg-white hover:bg-surface-container-low"
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={() => setDeliveryMethod("delivery")}
                className="sr-only"
              />
              <span className={deliveryMethod === "delivery" ? "text-secondary" : "text-on-surface-variant"}>
                <DeliveryIcon />
              </span>
              <span className="text-sm font-semibold text-on-surface">Delivery</span>
            </label>
            <label
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 transition-all active:scale-[0.98] ${
                deliveryMethod === "retirada"
                  ? "border-secondary-container bg-secondary-container/10"
                  : "border-outline-variant bg-white hover:bg-surface-container-low"
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="retirada"
                checked={deliveryMethod === "retirada"}
                onChange={() => setDeliveryMethod("retirada")}
                className="sr-only"
              />
              <span className={deliveryMethod === "retirada" ? "text-secondary" : "text-on-surface-variant"}>
                <StoreIcon />
              </span>
              <span className="text-sm font-semibold text-on-surface">Retirada</span>
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-primary">
            <CardIcon />
            Pagamento
          </h2>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 shadow-[0_4px_20px_rgba(50,7,41,0.05)] transition-all ${
                  paymentMethod === option.id
                    ? "border-secondary-container bg-secondary-container/10"
                    : "border-transparent bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={() => setPaymentMethod(option.id)}
                  className="h-5 w-5 border-outline-variant text-secondary focus:ring-secondary"
                />
                <span className={paymentMethod === option.id ? "text-secondary" : "text-on-surface-variant"}>
                  {option.icon}
                </span>
                <span className="flex-1 text-sm text-on-surface">{option.label}</span>
              </label>
            ))}
          </div>

          {paymentMethod === "dinheiro" && (
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="Troco para quanto? (opcional)"
              value={changeFor}
              onChange={(e) => setChangeFor(e.target.value)}
              className={`${inputClasses} mt-3`}
            />
          )}
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6" aria-hidden>
              <path d="M5 4h11l3 3v13H5z" strokeLinejoin="round" />
              <path d="M16 4v3h3" strokeLinejoin="round" />
              <path d="M8 12h8M8 15.5h5" strokeLinecap="round" />
            </svg>
            Observações
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Retirar granola, mandar colher extra"
            className={`${inputClasses} h-32 resize-none`}
          />
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <GlassCard className="overflow-hidden rounded-xl">
          <div className="bg-primary p-6 text-on-primary">
            <h2 className="font-display text-xl">Resumo do Pedido</h2>
          </div>
          <div className="space-y-6 p-6">
            <div className="max-h-64 space-y-4 overflow-y-auto custom-scrollbar pr-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <Image
                      src={item.product.imagem}
                      alt={item.product.nome}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary">{item.product.nome}</h3>
                    <p className="text-sm text-on-surface-variant">Quantidade: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-secondary">
                    {formatCurrency(item.product.preco * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-surface-container-highest pt-4">
              <div className="flex items-center justify-between pt-2">
                <span className="font-display text-lg text-primary">Total</span>
                <span className="font-display text-2xl text-secondary">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-bold text-on-secondary shadow-lg transition-all hover:bg-secondary/90 active:scale-95"
            >
              Finalizar Pedido
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-xl border border-outline-variant py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
            >
              Voltar ao cardápio
            </button>
          </div>
        </GlassCard>
      </aside>
    </form>
  );
}
