import styles from "./Header.module.css"

interface HeaderProps {
  rightElement?: JSX.Element
  leftElement?: JSX.Element
}

function Header({ rightElement, leftElement }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.leftElement}>{leftElement}</div>
      <div className={styles.logo}>Building Blocks</div>
      <div className={styles.rightElement}>{rightElement}</div>
    </div>
  )
}

export default Header
