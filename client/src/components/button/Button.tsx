import { ReactNode } from "react"
import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "neutral" | "green" | "blue"
  size?: "md" | "lg"
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  children: string | ReactNode
}

function Button({
  color = "neutral",
  size = "md",
  disabled,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles[color]} ${styles[size]}`}
      disabled={disabled || false}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
