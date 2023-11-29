import styles from "./HostCreating.module.css"
import { Button, Header } from "../components"
import { CreateGame } from "../features/create-game"

function HostCreating() {
  return (
    <div>
      <Header
        leftElement={
          <Button size="lg" onClick={() => window.location.reload()}>
            Join a game
          </Button>
        }
      />
      <div className={styles.container}>
        <CreateGame />
      </div>
    </div>
  )
}

export default HostCreating
