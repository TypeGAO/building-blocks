import { Tooltip } from ".."
import styles from "./HostControlsButton.module.css"

interface HostControlsButtonProps {
  icon: JSX.Element
  label: string
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

function HostControlsButton({ icon, label, onClick }: HostControlsButtonProps) {
  return (
    <Tooltip label={label}>
      <button className={styles.button} onClick={onClick}>
        {icon}
      </button>
    </Tooltip>
  )
}

export default HostControlsButton
