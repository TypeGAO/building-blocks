import styles from "./PlayerLobby.module.css"
import { Spinner } from "../components"
import { GameHeader } from "../features/game-header"
import funFacts from "../assets/fun-facts.json"

function getRandomFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)]
}

function PlayerLobby() {
  return (
    <>
      <GameHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>You're in!</h1>
          <div>
            <Spinner color="blue" />
          </div>
          <p className={styles.fact}>
            <strong>Did you know?</strong> {getRandomFact()}
          </p>
        </div>
      </div>
    </>
  )
}

export default PlayerLobby
