"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Product, ProductSelection } from "../lib/types";
import {
  ACOMPANHAMENTOS,
  ACOMPANHAMENTOS_MAX,
  ACOMPANHAMENTOS_MIN,
  CALDAS,
  FRUTA_PRECO,
  FRUTAS,
  SABORES,
} from "../lib/options";

type ProductOptionsModalProps = {
  product: Product;
  onConfirm: (selection: ProductSelection) => void;
  onClose: () => void;
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function RequiredBadge({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-secondary" aria-hidden>
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold tracking-wide text-on-primary uppercase">
      Obrigatório
    </span>
  );
}

export function ProductOptionsModal({ product, onConfirm, onClose }: ProductOptionsModalProps) {
  const [sabor, setSabor] = useState<string>("");
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);
  const [calda, setCalda] = useState<string>("");
  const [frutas, setFrutas] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleFruta = (item: string) => {
    setFrutas((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]
    );
  };

  const toggleAcompanhamento = (item: string) => {
    setAcompanhamentos((current) => {
      if (current.includes(item)) {
        return current.filter((entry) => entry !== item);
      }
      if (current.length >= ACOMPANHAMENTOS_MAX) {
        return current;
      }
      return [...current, item];
    });
  };

  const acompanhamentosValid =
    acompanhamentos.length >= ACOMPANHAMENTOS_MIN && acompanhamentos.length <= ACOMPANHAMENTOS_MAX;
  const isValid = sabor !== "" && acompanhamentosValid && calda !== "";

  const unitPrice = product.preco + frutas.length * FRUTA_PRECO;
  const totalPrice = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  const handleConfirm = () => {
    if (!isValid) return;
    for (let i = 0; i < quantity; i++) {
      onConfirm({ sabor, acompanhamentos, calda, frutas });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      <div className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-surface-container-lowest shadow-2xl sm:max-w-lg sm:rounded-2xl">
        <div className="flex shrink-0 items-center gap-3 border-b border-surface-container-highest px-4 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container-high"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path
                fillRule="evenodd"
                d="M5.28 4.22a.75.75 0 00-1.06 1.06L8.94 10l-4.72 4.72a.75.75 0 101.06 1.06L10 11.06l4.72 4.72a.75.75 0 101.06-1.06L11.06 10l4.72-4.72a.75.75 0 00-1.06-1.06L10 8.94 5.28 4.22z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex flex-1 items-center gap-3 overflow-hidden">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-surface-container">
              <Image
                src={product.imagem}
                alt={product.nome}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="truncate font-display text-lg text-primary">{product.nome}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between gap-3 bg-surface-container-low px-4 py-4">
            <div>
              <h3 className="font-bold text-on-surface">Sabor</h3>
              <p className="text-sm text-on-surface-variant">Escolha 1 opção</p>
            </div>
            <RequiredBadge done={sabor !== ""} />
          </div>
          <ul>
            {SABORES.map((item) => (
              <li key={item} className="border-b border-surface-container-high last:border-b-0">
                <button
                  type="button"
                  onClick={() => setSabor(item)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-surface-container-low"
                >
                  <span className={sabor === item ? "font-semibold text-on-surface" : "text-on-surface"}>
                    {item}
                  </span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      sabor === item ? "border-secondary" : "border-outline-variant"
                    }`}
                  >
                    {sabor === item && <span className="h-2.5 w-2.5 rounded-full bg-secondary" />}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-3 bg-surface-container-low px-4 py-4">
            <div>
              <h3 className="font-bold text-on-surface">Acompanhamentos</h3>
              <p className="text-sm text-on-surface-variant">
                Escolha de {ACOMPANHAMENTOS_MIN} a {ACOMPANHAMENTOS_MAX}
              </p>
            </div>
            <RequiredBadge done={acompanhamentosValid} />
          </div>
          <ul>
            {ACOMPANHAMENTOS.map((item) => {
              const checked = acompanhamentos.includes(item);
              const disabled = !checked && acompanhamentos.length >= ACOMPANHAMENTOS_MAX;
              return (
                <li key={item} className="border-b border-surface-container-high last:border-b-0">
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => toggleAcompanhamento(item)}
                    className={`flex w-full items-center justify-between px-4 py-4 text-left transition-colors ${
                      disabled ? "cursor-not-allowed opacity-40" : "hover:bg-surface-container-low"
                    }`}
                  >
                    <span className={checked ? "font-semibold text-on-surface" : "text-on-surface"}>
                      {item}
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                        checked
                          ? "border-secondary bg-secondary text-on-secondary"
                          : "border-outline-variant text-transparent"
                      }`}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between gap-3 bg-surface-container-low px-4 py-4">
            <div>
              <h3 className="font-bold text-on-surface">Caldas</h3>
              <p className="text-sm text-on-surface-variant">Escolha 1 opção</p>
            </div>
            <RequiredBadge done={calda !== ""} />
          </div>
          <ul>
            {CALDAS.map((item) => (
              <li key={item} className="border-b border-surface-container-high last:border-b-0">
                <button
                  type="button"
                  onClick={() => setCalda(item)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-surface-container-low"
                >
                  <span className={calda === item ? "font-semibold text-on-surface" : "text-on-surface"}>
                    {item}
                  </span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      calda === item ? "border-secondary" : "border-outline-variant"
                    }`}
                  >
                    {calda === item && <span className="h-2.5 w-2.5 rounded-full bg-secondary" />}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-3 bg-surface-container-low px-4 py-4">
            <div>
              <h3 className="font-bold text-on-surface">Frutas</h3>
              <p className="text-sm text-on-surface-variant">
                Opcional — {formatCurrency(FRUTA_PRECO)} por fruta
              </p>
            </div>
          </div>
          <ul>
            {FRUTAS.map((item) => {
              const checked = frutas.includes(item);
              return (
                <li key={item} className="border-b border-surface-container-high last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleFruta(item)}
                    className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-surface-container-low"
                  >
                    <span className={checked ? "font-semibold text-on-surface" : "text-on-surface"}>
                      {item}
                      <span className="ml-2 text-xs font-normal text-on-surface-variant">
                        + {formatCurrency(FRUTA_PRECO)}
                      </span>
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                        checked
                          ? "border-secondary bg-secondary text-on-secondary"
                          : "border-outline-variant text-transparent"
                      }`}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-surface-container-highest bg-surface-container-lowest px-4 py-4">
          <div className="flex shrink-0 items-center gap-3 rounded-lg border border-outline-variant px-3 py-2.5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
              className="text-lg leading-none text-primary"
            >
              −
            </button>
            <span className="w-4 text-center font-semibold text-on-surface">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar quantidade"
              className="text-lg leading-none text-primary"
            >
              +
            </button>
          </div>
          <button
            type="button"
            disabled={!isValid}
            onClick={handleConfirm}
            className="flex flex-1 items-center justify-between gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-on-primary transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Adicionar</span>
            <span>{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
