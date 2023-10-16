import styles from "./Input.module.css"

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string
  size?: "md" | "lg"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: boolean
}

function Input({
  value,
  size = "md",
  onChange,
  placeholder,
  error,
  ...props
}: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${error ? styles.error : styles.default} ${styles[size]}`}
      {...props}
    />
  )
}

export default Input
