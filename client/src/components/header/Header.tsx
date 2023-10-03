import styles from "./Header.module.css"

interface HeaderProps {
  rightElement?: JSX.Element
  leftElement?: JSX.Element
}

function Header({ rightElement, leftElement }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>{leftElement}</div>
      <div className={styles.mid}></div>
      <div className={styles.right}>{rightElement}</div>
    </div>
  )
}

export default Header
