import styles from "./Input.module.css"

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: boolean
}

function Input({ value, onChange, placeholder, error }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? styles.error : styles.default}
    />
  )
}

export default Input
