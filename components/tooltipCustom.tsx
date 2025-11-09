import { Tooltip as RetroTooltip } from "@/components/retroui/Tooltip"
import { ReactNode } from "react"

export interface TooltipProps {
  children: ReactNode
  legend: string | ReactNode
}
export const Tooltip = ({ children, legend }: TooltipProps) => {
  return (
    <RetroTooltip.Provider>
      <RetroTooltip delayDuration={50}>
        <RetroTooltip.Trigger asChild>
          {children}
        </RetroTooltip.Trigger>

        <RetroTooltip.Content variant="default">{legend}</RetroTooltip.Content>
      </RetroTooltip>
    </RetroTooltip.Provider>
  )
}