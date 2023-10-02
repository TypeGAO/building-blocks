import styles from "./Input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: boolean
}

function Input({ value, onChange, placeholder, error, ...props }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? styles.error : styles.default}
      {...props}
    />
  )
}

export default Input
