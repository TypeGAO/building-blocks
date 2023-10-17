import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "neutral" | "green" | "blue"
  size?: "md" | "lg"
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLElement>) => void
  children: string
}

function Button({
  color,
  size,
  disabled,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles[color || "neutral"]} ${styles[size || "md"]}`}
      disabled={disabled || false}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
