import { Customer } from "./types";

const STORAGE_KEY = "cardapio-customer";

export function loadCustomer(): Customer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Customer;
  } catch {
    return null;
  }
}

export function saveCustomer(customer: Customer) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
}

export function clearCustomer() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
