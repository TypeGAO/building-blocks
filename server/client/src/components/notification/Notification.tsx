import styles from "./Notification.module.css"

interface NotificationProps {
  color?: "red" | "green" | "orange"
  children: string
}

function Notification({ color, children }: NotificationProps) {
  return (
    <div
      className={styles[color || "green"]}>
      {children}
    </div>
  )
}

export default Notification
