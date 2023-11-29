import styles from "./TextArea.module.css"

interface TextAreaProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "size"> {
  value: string
  size?: "md" | "lg"
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  error?: boolean
  rows: number
}

function TextArea({
  value,
  size = "md",
  onChange,
  placeholder,
  error,
  rows,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${error ? styles.error : styles.default} ${styles[size]}`}
      {...props}
    />
  )
}

export default TextArea
