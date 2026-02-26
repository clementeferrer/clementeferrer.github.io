import { clsx } from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "featured";
  hover?: boolean;
}

const variantStyles = {
  default:
    "bg-surface border border-border shadow-sm",
  elevated:
    "bg-surface shadow-md",
  outlined:
    "bg-transparent border border-border",
  featured:
    "bg-surface border border-border border-l-4 border-l-primary shadow-sm",
};

const hoverStyles = {
  default: "hover:shadow-md transition-shadow duration-300",
  elevated: "hover:shadow-lg transition-shadow duration-300",
  outlined: "hover:border-primary/30 transition-colors duration-300",
  featured: "hover:shadow-md transition-shadow duration-300",
};

export default function Card({
  children,
  className,
  variant = "default",
  hover = true,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl p-6",
        variantStyles[variant],
        hover && hoverStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
