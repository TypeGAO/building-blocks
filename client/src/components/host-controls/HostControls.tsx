import styles from "./HostControls.module.css"
import HostControlsButton from "./HostControlsButton"

interface Control {
  icon: JSX.Element
  label: string
  onClick: () => void
}

interface HostControlsProps {
  controls: Control[]
}

function HostControls({ controls }: HostControlsProps) {
  return (
    <div className={styles.controls}>
      {controls.map((item, index) => {
        return (
          <HostControlsButton
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        )
      })}
    </div>
  )
}

export default HostControls
