import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const baseClasses =
  "motion-safe-only inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition-[background-color,box-shadow,transform] duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand focus-visible:ring-offset-2 " +
  "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-[0_1px_2px_rgba(27,77,255,0.15),0_6px_16px_rgba(27,77,255,0.22)] hover:bg-brand-dark active:bg-brand-dark disabled:hover:bg-brand disabled:shadow-none",
  secondary:
    "bg-white text-ink border border-hairline hover:bg-surface-subtle active:bg-surface-subtle",
  ghost: "bg-transparent text-brand hover:bg-brand-light active:bg-brand-light",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-6 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

interface ButtonAsLinkProps extends CommonProps {
  href: string;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        aria-label={props["aria-label"]}
      >
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    className: _className,
    children: _children,
    href: _href,
    type = "button",
    ...rest
  } = props as ButtonAsButtonProps;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
