"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProductCard } from "../components/ProductCard";
import { CartDrawer } from "../components/CartDrawer";
import { CustomerDataForm } from "../components/CustomerDataForm";
import { CheckoutForm } from "../components/CheckoutForm";
import { CategoryIcon } from "../components/CategoryIcon";
import { BannerCarousel } from "../components/BannerCarousel";
import { ProductOptionsModal } from "../components/ProductOptionsModal";
import { categories, products } from "../lib/products";
import { useCartStore } from "../lib/store/cart";
import { buildOrderMessage, buildWhatsappLink } from "../lib/whatsapp";
import { Category, Customer, DeliveryMethod, PaymentMethod, Product, ProductSelection } from "../lib/types";

type Step = "cardapio" | "dados-cliente" | "checkout" | "confirmacao";

export default function Home() {
  const [step, setStep] = useState<Step>("cardapio");
  const [activeCategory, setActiveCategory] = useState<Category>("Copos");
  const [cartOpen, setCartOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.categoria === activeCategory),
    [activeCategory]
  );

  const handleCustomerSubmit = (data: Customer) => {
    setCustomer(data);
    setStep("checkout");
  };

  const handleConfirmSelection = (selection: ProductSelection) => {
    if (!selectedProduct) return;
    addItem(selectedProduct, selection);
  };

  const handleOrderSubmit = (
    deliveryMethod: DeliveryMethod,
    paymentMethod: PaymentMethod,
    changeFor?: number,
    notes?: string
  ) => {
    if (!customer) return;
    const message = buildOrderMessage(items, customer, deliveryMethod, paymentMethod, changeFor, notes);
    const link = buildWhatsappLink(message);
    window.open(link, "_blank");
    clearCart();
    setCustomer(null);
    setStep("confirmacao");
  };

  return (
    <>
      <div className="leaf-overlay" />

      <header className="sticky top-0 z-40 w-full bg-surface shadow-[0px_4px_20px_rgba(50,7,41,0.05)]">
        <div className="mx-auto grid max-w-(--layout-max) grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-4 md:px-10">
          <Image
            src="/logo.png"
            alt="Açaí do DS"
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
          />

          <h1 className="pointer-events-none justify-self-center text-center leading-none whitespace-nowrap">
            <span className="font-display text-2xl text-primary italic sm:text-3xl md:text-4xl">
              Açaí
            </span>
            <span className="mx-2 text-lg text-secondary sm:text-xl md:text-2xl">do</span>
            <span className="font-display text-2xl font-bold tracking-tight text-secondary sm:text-3xl md:text-4xl">
              DS
            </span>
          </h1>

          <button
            type="button"
            onClick={() => setCartOpen((open) => !open)}
            className="relative cursor-pointer p-2 text-primary"
            aria-label="Abrir carrinho"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
              <path
                fillRule="evenodd"
                d="M4 7a1 1 0 011-1h1.28l.71-2.132A1 1 0 018 3h8a1 1 0 01.95.684L17.72 6H19a1 1 0 110 2h-.34l-1.2 8.4A2 2 0 0115.48 18H8.52a2 2 0 01-1.98-1.6L5.34 8H5a1 1 0 01-1-1zm4.32-1L8 6h8l-.32-1H8.32zM8.5 10a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018.5 10zm3.5 0a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75zm3.5 0a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-secondary text-[10px] font-bold text-on-secondary">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-(--layout-max) flex-1 gap-6 overflow-x-hidden px-4 py-6 md:px-10">
        {step === "cardapio" && (
          <>
            <div className="min-w-0 flex-1">
              <BannerCarousel
                banners={[
                  { src: "/Banner.png", alt: "Açaí do DS — Mais que açaí, uma explosão de sabor!" },
                  {
                    src: "/banner_barca.jpg",
                    alt: "Refresque-se com o melhor açaí da cidade — peça já sua barca turbinada!",
                    objectPosition: "75% center",
                  },
                               {
                    src: "/banner_poersonagem.png",
                    alt: "Refresque-se com o melhor açaí da cidade — peça já sua barca turbinada!",
                    objectPosition: "75% center",
                  },
                ]}
              />

              <nav className="mb-8 flex gap-3 overflow-x-auto pb-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-full py-3 pr-6 pl-3 font-semibold whitespace-nowrap transition-all active:scale-95 ${
                        isActive
                          ? "bg-secondary-container text-on-secondary-container shadow-[0_4px_14px_rgba(57,106,0,0.25)]"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isActive ? "bg-surface-container-lowest/60" : "bg-surface-container-high"
                        }`}
                      >
                        <CategoryIcon category={category.id} className="h-4.5 w-4.5" />
                      </span>
                      {category.label.toUpperCase()}
                    </button>
                  );
                })}
              </nav>

              <div className="flex max-w-4xl flex-col gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={setSelectedProduct} />
                ))}
              </div>
            </div>

            <div className="hidden w-[300px] shrink-0 lg:block xl:w-[340px]">
              <CartDrawer
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                onCheckout={() => setStep("dados-cliente")}
              />
            </div>

            {cartOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <button
                  type="button"
                  aria-label="Fechar carrinho"
                  onClick={() => setCartOpen(false)}
                  className="absolute inset-0 bg-black/40"
                />
                <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm overflow-y-auto p-4">
                  <CartDrawer
                    items={items}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onCheckout={() => {
                      setCartOpen(false);
                      setStep("dados-cliente");
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {step === "dados-cliente" && (
          <div className="mx-auto w-full">
            <CustomerDataForm onSubmit={handleCustomerSubmit} onBack={() => setStep("cardapio")} />
          </div>
        )}

        {step === "checkout" && (
          <div className="mx-auto w-full">
            <CheckoutForm
              items={items}
              onSubmit={handleOrderSubmit}
              onBack={() => setStep("dados-cliente")}
            />
          </div>
        )}

        {step === "confirmacao" && (
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-surface-container-highest bg-surface-container-lowest p-8 text-center shadow-[0px_4px_20px_rgba(50,7,41,0.05)]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-14 w-14 text-secondary" aria-hidden>
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="font-display text-2xl text-primary">Pedido enviado!</h2>
            <p className="text-on-surface-variant">
              Abrimos o WhatsApp com os detalhes do seu pedido. Confirme o envio por lá para
              finalizar.
            </p>
            <button
              type="button"
              onClick={() => setStep("cardapio")}
              className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
            >
              Fazer novo pedido
            </button>
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductOptionsModal
          product={selectedProduct}
          onConfirm={handleConfirmSelection}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <footer className="mt-auto w-full bg-tertiary">
        <div className="mx-auto flex max-w-(--layout-max) flex-col justify-between gap-12 px-4 py-12 md:flex-row md:px-10">
          <div className="max-w-xs">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Açaí do DS"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border border-on-tertiary/20 object-cover"
              />
              <span className="font-display text-lg text-secondary-fixed">Açaí do DS</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-on-tertiary/60">
              O autêntico sabor da Amazônia servido com carinho e qualidade artesanal para
              energizar o seu dia.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Compartilhar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-tertiary/25 text-on-tertiary/70 transition-colors hover:border-secondary-fixed hover:text-secondary-fixed"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
                  <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.732 3.367a2.5 2.5 0 11-.671 1.341l-6.732-3.367a2.5 2.5 0 110-3.474l6.732-3.367A2.52 2.52 0 0113 4.5z" />
                </svg>
              </a>
              <a
                href="https://wa.me/5592993129862"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-tertiary/25 text-on-tertiary/70 transition-colors hover:border-secondary-fixed hover:text-secondary-fixed"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-15.2-3.5L2 18l11.6-.8A8 8 0 0018 10zM7.5 6.5c.3-.6.6-.6.9-.6h.5c.2 0 .4 0 .6.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.4.5-.1.2-.3.3-.1.6.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.7 1.6.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.9-.2 1.7-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.2-4.2-.9-3.5-1.4-5.7-4.9-5.9-5.1-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.9z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/leirisson-souza/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-tertiary/25 text-on-tertiary/70 transition-colors hover:border-secondary-fixed hover:text-secondary-fixed"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
                  <path d="M3.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM2.25 7.75h2.5v9.5h-2.5v-9.5zM7.75 7.75h2.4v1.3h.03c.33-.63 1.15-1.3 2.37-1.3 2.53 0 3 1.66 3 3.83v5.67h-2.5v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65v5.12h-2.5v-9.5z" />
                </svg>
              </a>
              <a
                href="mailto:Leirissonsouza99@gmail.com"
                aria-label="E-mail"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-on-tertiary/25 text-on-tertiary/70 transition-colors hover:border-secondary-fixed hover:text-secondary-fixed"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
                  <path d="M2.5 4A1.5 1.5 0 001 5.5v.379l9 5.13 9-5.13V5.5A1.5 1.5 0 0017.5 4h-15z" />
                  <path d="M19 7.472l-9 5.13-9-5.13V14.5A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5V7.472z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:gap-x-12">
            <div className="flex flex-col gap-3">
              <h4 className="mb-1 text-sm font-bold tracking-widest text-secondary-fixed uppercase">
                Explore
              </h4>
              <a
                href="#"
                className="text-sm text-on-tertiary/60 transition-colors hover:text-secondary-fixed"
              >
                Início
              </a>
              <a
                href="#"
                className="text-sm text-on-tertiary/60 transition-colors hover:text-secondary-fixed"
              >
                Nosso Açaí
              </a>
              <a
                href="#"
                className="text-sm text-on-tertiary/60 transition-colors hover:text-secondary-fixed"
              >
                Sobre Nós
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="mb-1 text-sm font-bold tracking-widest text-secondary-fixed uppercase">
                Suporte
              </h4>
              <a
                href="#"
                className="text-sm text-on-tertiary/60 transition-colors hover:text-secondary-fixed"
              >
                Cardápio
              </a>
              <a
                href="#"
                className="text-sm text-on-tertiary/60 transition-colors hover:text-secondary-fixed"
              >
                Localização
              </a>
              <a
                href="mailto:Leirissonsouza99@gmail.com"
                className="text-sm text-on-tertiary/60 transition-colors hover:text-secondary-fixed"
              >
                Contato
              </a>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-on-tertiary/10 bg-tertiary-container p-6 md:w-auto md:min-w-[260px]">
            <h4 className="mb-2 font-bold text-on-tertiary">Horário de Funcionamento</h4>
            <p className="mb-1 text-sm text-on-tertiary/60">Segunda a Sábado: 11h às 22h</p>
            <p className="text-sm text-on-tertiary/60">Domingo: 14h às 21h</p>
            <div className="mt-4 flex items-center gap-2 border-t border-on-tertiary/10 pt-4">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4.5 w-4.5 shrink-0 text-secondary-fixed"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-on-tertiary/60">Alameda orion, 52 - Aleixo</span>
            </div>
          </div>
        </div>
        <div className="border-t border-on-tertiary/10 px-4 py-6 text-center text-xs text-on-tertiary/50 md:px-10">
          <p>© 2026 - Leirisson Souza</p>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href="https://wa.me/5592993129862"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-secondary-fixed"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-15.2-3.5L2 18l11.6-.8A8 8 0 0018 10zM7.5 6.5c.3-.6.6-.6.9-.6h.5c.2 0 .4 0 .6.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.4.5-.1.2-.3.3-.1.6.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.7 1.6.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.9-.2 1.7-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.2-4.2-.9-3.5-1.4-5.7-4.9-5.9-5.1-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.9z"
                  clipRule="evenodd"
                />
              </svg>
              (92) 99312-9862
            </a>
            <a
              href="mailto:Leirissonsouza99@gmail.com"
              className="flex items-center gap-1.5 transition-colors hover:text-secondary-fixed"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                <path d="M2.5 4A1.5 1.5 0 001 5.5v.379l9 5.13 9-5.13V5.5A1.5 1.5 0 0017.5 4h-15z" />
                <path d="M19 7.472l-9 5.13-9-5.13V14.5A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5V7.472z" />
              </svg>
              Leirissonsouza99@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/leirisson-souza/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-secondary-fixed"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                <path d="M3.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM2.25 7.75h2.5v9.5h-2.5v-9.5zM7.75 7.75h2.4v1.3h.03c.33-.63 1.15-1.3 2.37-1.3 2.53 0 3 1.66 3 3.83v5.67h-2.5v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65v5.12h-2.5v-9.5z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.leirissonsouza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-secondary-fixed"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                <path d="M11.603 7.603a.75.75 0 00-1.061 1.06 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.535l1.225-1.224a.75.75 0 10-1.061-1.06L3.087 10.735a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
              </svg>
              Portfólio
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
