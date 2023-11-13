import styles from "./Header.module.css"
import Logo from "../../assets/logo.svg?react"

interface HeaderProps {
  rightElement?: JSX.Element
  leftElement?: JSX.Element
}

function Header({ rightElement, leftElement }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>{leftElement}</div>
      <div className={styles.mid}><Logo /></div>
      <div className={styles.right}>{rightElement}</div>
    </div>
  )
}

export default Header
