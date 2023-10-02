import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "neutral" | "green" | "blue"
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLElement>) => void
  children: string
}

function Button({ color, disabled, onClick, children, ...props }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles[color || "neutral"]}
      disabled={disabled || false}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
