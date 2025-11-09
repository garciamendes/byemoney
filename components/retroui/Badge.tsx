import { STATUS_INVOICE } from "@/app/(home)/constants";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const badgeVariants = cva("font-semibold rounded", {
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground",
      outline: "outline-2 outline-foreground text-foreground",
      solid: "bg-foreground text-background",
      surface: "outline-2 bg-primary text-primary-foreground",
    },
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-2.5 py-1.5 text-sm",
      lg: "px-3 py-2 text-base",
    },
    color: {
      [STATUS_INVOICE.OPEN]: '',
      [STATUS_INVOICE.PAIDED]: 'bg-paided text-paided-foreground',
      [STATUS_INVOICE.OVERDUE]: 'bg-destructive text-destructive-foreground',
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface ButtonProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
  VariantProps<typeof badgeVariants> { }

export function Badge({
  children,
  size = "md",
  variant = "default",
  color = STATUS_INVOICE.OPEN,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, color }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
