import { ReactNode } from "react"
import styles from "./Tooltip.module.css"

interface TooltipProps {
  label: string
  position?: "left" | "right"
  children: ReactNode
}

function Tooltip({ label, position = "left", children }: TooltipProps) {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={`${styles.tooltipLabel} ${styles[position]}`}>
        {label}
      </span>
    </div>
  )
}

export default Tooltip
