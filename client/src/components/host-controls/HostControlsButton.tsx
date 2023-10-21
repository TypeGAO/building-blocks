import styles from "./HostControlsButton.module.css"

interface HostControlsButtonProps {
  icon: JSX.Element
  label: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

function HostControlsButton({ icon, label, onClick }: HostControlsButtonProps) {
  return (
    <button title={label} className={styles.button} onClick={onClick}>
      {icon}
    </button>
  )
}

export default HostControlsButton
