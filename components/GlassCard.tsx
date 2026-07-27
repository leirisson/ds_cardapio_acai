import { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`rounded-xl border border-surface-container-highest bg-surface-container-lowest shadow-[0px_4px_20px_rgba(50,7,41,0.05)] ${className}`}
      {...props}
    />
  );
}
