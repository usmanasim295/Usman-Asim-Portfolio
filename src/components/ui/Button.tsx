import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:shadow-[0_0_0_1px_var(--color-accent),0_8px_30px_var(--glow-accent)] hover:-translate-y-0.5",
  secondary:
    "border border-border bg-surface text-ink hover:border-border-strong hover:bg-surface-elevated hover:-translate-y-0.5",
  ghost: "text-ink-secondary hover:text-ink",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
}

interface NativeButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, className: _className, href: _href, ...rest } =
    props as NativeButtonProps;
  void _variant;
  void _className;
  void _href;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
