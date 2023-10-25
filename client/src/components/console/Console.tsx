import styles from "./Console.module.css"

function Console (content: any) {
    return (
        <div className={styles.console}>
            <div className={styles.left}></div>
            <div className={styles.mid}>
                <div className={styles.content}>{content}</div>
            </div>
            <div className={styles.right}></div>
        </div>
    )
}

export default Console 
