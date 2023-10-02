import styles from "./Button.module.css"

interface ButtonProps {
  color?: "neutral" | "green" | "blue"
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLElement>) => void
  children: string
}

function Button({ color, disabled, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles[color || "neutral"]}
      disabled={disabled || false}
    >
      {children}
    </button>
  )
}

export default Button
