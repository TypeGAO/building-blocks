/// <reference types="vite-plugin-svgr/client" />
import Block_1 from "../../assets/blocks/block_1.svg?react"
import Crane from "../../assets/crane.svg?react"
import useGameActivity from "../../hooks/useGameActivity"
import styles from "./styles.module.css"

function Scene() {
  const { currentPlayer } = useGameActivity()

  console.log(currentPlayer.buildingBlocksId)
  return (
    <div className={styles.scene}>
      <div className={styles.crane}>
        <Crane height="350px" />
      </div>
      <div className={styles.tower}>
        <Block_1 />
      </div>
    </div>
  )
}

export default Scene
