import styles from "./Notification.module.css"

interface NotificationProps {
  color?: "red" | "green" | "orange"
  children: string
}

function Notification({ color = "green", children }: NotificationProps) {
  return <div className={styles[color]}>{children}</div>
}

export default Notification
