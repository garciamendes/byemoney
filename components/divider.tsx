import { cn } from "@/lib/utils"

type DividerOrientation = "horizontal" | "vertical"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation
  /**
   * Se tiver children, o divider vira uma linha com texto centralizado.
   */
  children?: React.ReactNode
}

export function Divider({
  orientation = "horizontal",
  className,
  children,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal"

  if (!children) {
    return (
      <div
        role="separator"
        aria-orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          isHorizontal ? "h-px w-full" : "w-px h-full",
          className
        )}
        {...props}
      />
    )
  }

  if (!isHorizontal) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "inline-flex h-full items-center gap-2",
          className
        )}
        {...props}
      >
        <div className="h-full w-px bg-border" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {children}
        </span>
      </div>
    )
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-center gap-2",
        className
      )}
      {...props}
    >
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
