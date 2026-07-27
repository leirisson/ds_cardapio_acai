import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "./GlassCard";
import { Customer, DeliveryAddress } from "../lib/types";
import { loadCustomer, saveCustomer, clearCustomer } from "../lib/customerStorage";

type CustomerDataFormProps = {
  onSubmit: (customer: Customer) => void;
  onBack: () => void;
};

const initialAddress: DeliveryAddress = {
  rua: "",
  numero: "",
  bairro: "",
  complemento: "",
  cidade: "",
};

const initialCustomer: Customer = {
  nome: "",
  whatsapp: "",
  email: "",
  endereco: initialAddress,
};

const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-white p-3 pl-10 text-sm text-on-surface placeholder:text-on-surface-variant/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10";

const plainInputClasses =
  "w-full rounded-lg border border-outline-variant bg-white p-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10";

function PersonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden>
      <path d="M4 5h16v10H8l-4 4z" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 6.5 12 13l8-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <path d="M3 7h11v8H3z" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v2h-7z" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CustomerDataForm({ onSubmit, onBack }: CustomerDataFormProps) {
  const [customer, setCustomer] = useState<Customer>(() => loadCustomer() ?? initialCustomer);
  const [saveData, setSaveData] = useState(() => loadCustomer() !== null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (saveData) {
      saveCustomer(customer);
    } else {
      clearCustomer();
    }
    onSubmit(customer);
  };

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display text-2xl text-primary md:text-3xl">Finalize seu Pedido</h1>
        <p className="mt-2 text-on-surface-variant">
          Preencha seus dados para entrega e pagamento.
        </p>
      </div>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <GlassCard className="rounded-xl p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-outline-variant pb-4">
            <PersonIcon className="h-5 w-5 text-secondary" />
            <h2 className="font-display text-xl text-primary">Dados Pessoais</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-on-surface-variant">Nome Completo</label>
              <input
                required
                placeholder="Como devemos te chamar?"
                value={customer.nome}
                onChange={(e) => setCustomer({ ...customer, nome: e.target.value })}
                className={plainInputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-on-surface-variant">
                WhatsApp / Telefone
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                  <ChatIcon />
                </span>
                <input
                  required
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={customer.whatsapp}
                  onChange={(e) => setCustomer({ ...customer, whatsapp: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-on-surface-variant">E-mail</label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden rounded-xl p-6 md:p-8">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="pointer-events-none absolute -top-6 -right-6 h-40 w-40 rotate-12 text-secondary/5"
            aria-hidden
          >
            <path d="M12 2C8 6 6 10 6 13.5A6 6 0 0012 19.5 6 6 0 0018 13.5C18 10 16 6 12 2z" />
          </svg>
          <div className="relative mb-6 flex items-center gap-3 border-b border-outline-variant pb-4">
            <TruckIcon className="h-5 w-5 text-secondary" />
            <h2 className="font-display text-xl text-primary">Endereço de Entrega</h2>
          </div>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-6">
            <div className="flex flex-col gap-2 md:col-span-4">
              <label className="text-sm font-semibold text-on-surface-variant">Rua / Avenida</label>
              <input
                required
                placeholder="Nome da rua"
                value={customer.endereco.rua}
                onChange={(e) =>
                  setCustomer({ ...customer, endereco: { ...customer.endereco, rua: e.target.value } })
                }
                className={plainInputClasses}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-on-surface-variant">Número</label>
              <input
                required
                placeholder="Ex: 123"
                value={customer.endereco.numero}
                onChange={(e) =>
                  setCustomer({ ...customer, endereco: { ...customer.endereco, numero: e.target.value } })
                }
                className={plainInputClasses}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-3">
              <label className="text-sm font-semibold text-on-surface-variant">Complemento</label>
              <input
                placeholder="Apt, Bloco, etc (Opcional)"
                value={customer.endereco.complemento}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    endereco: { ...customer.endereco, complemento: e.target.value },
                  })
                }
                className={plainInputClasses}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-3">
              <label className="text-sm font-semibold text-on-surface-variant">Bairro</label>
              <input
                required
                placeholder="Seu bairro"
                value={customer.endereco.bairro}
                onChange={(e) =>
                  setCustomer({ ...customer, endereco: { ...customer.endereco, bairro: e.target.value } })
                }
                className={plainInputClasses}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-6">
              <label className="text-sm font-semibold text-on-surface-variant">Cidade</label>
              <input
                required
                placeholder="Ex: São Paulo - SP"
                value={customer.endereco.cidade}
                onChange={(e) =>
                  setCustomer({ ...customer, endereco: { ...customer.endereco, cidade: e.target.value } })
                }
                className={plainInputClasses}
              />
            </div>
          </div>
        </GlassCard>

        <div className="flex flex-col items-center gap-6">
          <label className="group flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={saveData}
              onChange={(e) => setSaveData(e.target.checked)}
              className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20"
            />
            <span className="text-sm text-on-surface-variant transition-colors group-hover:text-primary">
              Salvar meus dados para a próxima compra
            </span>
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-10 py-5 font-display text-lg text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] md:w-auto md:min-w-[400px]"
          >
            Continuar para Pagamento
            <ChevronRightIcon />
          </button>

          <p className="max-w-[300px] text-center text-xs text-on-surface-variant/70">
            Ao continuar, você concorda com nossos termos de serviço e privacidade.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            Voltar ao cardápio
          </button>
        </div>
      </form>

      <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="group relative h-48 overflow-hidden rounded-2xl">
          <Image
            src="/copo_com_banana.jpg"
            alt="Ingredientes frescos"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/60 to-transparent p-6">
            <span className="font-display text-on-primary">Ingredientes Frescos</span>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl border border-secondary/10 bg-secondary-container/20 p-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="mb-4 h-9 w-9 text-secondary" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="mb-2 font-display text-lg text-secondary">Entrega Rápida</h3>
          <p className="text-sm text-on-secondary-container">
            Entregamos seu açaí gelado e perfeito em até 30 minutos na sua região.
          </p>
        </div>
      </div>
    </div>
  );
}
