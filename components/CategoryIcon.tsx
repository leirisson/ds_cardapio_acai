import { Category } from "../lib/types";

type CategoryIconProps = {
  category: Category;
  className?: string;
};

export function CategoryIcon({ category, className = "h-5 w-5" }: CategoryIconProps) {
  switch (category) {
    case "Copos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
          <path d="M6 8h12l-1.2 11.2a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.8L6 8z" strokeLinejoin="round" />
          <path d="M5 8h14" strokeLinecap="round" />
          <path d="M9.5 8V6.5a2.5 2.5 0 015 0V8" strokeLinejoin="round" />
        </svg>
      );
    case "Barcas":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
          <path d="M3 10h18l-2.2 7.5a2 2 0 01-1.9 1.5H7.1a2 2 0 01-1.9-1.5L3 10z" strokeLinejoin="round" />
          <path d="M7 10V7a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0117 7v3" strokeLinejoin="round" />
        </svg>
      );
    case "Potes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
          <path d="M12 3l8 4.5L12 12 4 7.5 12 3z" strokeLinejoin="round" />
          <path d="M4 12l8 4.5 8-4.5" strokeLinejoin="round" />
          <path d="M4 16.5L12 21l8-4.5" strokeLinejoin="round" />
        </svg>
      );
    case "Roletas":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="2" strokeLinejoin="round" />
          <path d="M4 9h16M9 4v16" />
        </svg>
      );
    default:
      return null;
  }
}
