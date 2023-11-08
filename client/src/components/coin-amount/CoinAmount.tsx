import styles from "./CoinAmount.module.css"
import coin from "../../assets/coin.svg"

interface CoinAmountProps {
  amount: number
  size?: "md" | "lg"
}

function CoinAmount({ amount, size = "md" }: CoinAmountProps) {
  const coinAmountClasses = size === "lg" ? styles.lg : styles.md

  return (
    <div className={`${styles.currency} ${coinAmountClasses}`}>
      <img
        src={coin}
        alt="coin"
        className={`${styles.coin} ${coinAmountClasses}`}
      />
      <span className={styles.quantity}>{amount}</span>
    </div>
  )
}

export default CoinAmount
