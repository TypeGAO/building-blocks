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
  size,
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
      className={`${error ? styles.error : styles.default} ${
        styles[size || "md"]
      }`}
      {...props}
    />
  )
}

export default Input
