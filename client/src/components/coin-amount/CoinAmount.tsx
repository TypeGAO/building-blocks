import styles from "./CoinAmount.module.css"
import coin from '../../assets/coin.svg'

interface CoinAmountProps {
    amount: number,
    size?: 'sm' | 'md'
}

function CoinAmount ({ amount, size = 'md' }: CoinAmountProps) {
    const coinAmountClasses = size === 'sm' ? styles.small : styles.medium
    
    return (
        <div className={`${styles.currency} ${coinAmountClasses}`}>
            <img src={coin} alt="coin" className={`${styles.coin} ${coinAmountClasses}`} />
            <div className={styles.quantity}>{ amount }</div>
        </div>
    )
}

export default CoinAmount
