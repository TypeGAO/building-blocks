import { useState, useEffect } from "react"
import { Block } from "../../components"
import useGameActivity from "../../hooks/useGameActivity"
import styles from "./styles.module.css"
import Crane from "../../assets/crane.svg?react"

interface SceneProps {
  showCrane?: boolean
}

function calcBlockMargin(i: number) {
  const towerBlockMargin = 66
  const margin = i * towerBlockMargin
  return `${margin}px`
}

function Scene({ showCrane }: SceneProps) {
  const { currentPlayer } = useGameActivity()
  const [newBlockId, setNewBlockId] = useState<number | null>(null)

  useEffect(() => {
    setTimeout(() => {
      // Whenever a new block is added, set its ID to trigger animation
      if (currentPlayer.buildingBlocksId.length > 0) {
        setNewBlockId(
          currentPlayer.buildingBlocksId[
            currentPlayer.buildingBlocksId.length - 1
          ]
        )

        // Reset the new block ID after a delay (adjust as needed)
        const resetTimeout = setTimeout(() => {
          setNewBlockId(null)
        }, 1050) // Adjust as needed

        return () => clearTimeout(resetTimeout)
      }
    }, 0)
  }, [currentPlayer.buildingBlocksId])

  return (
    <div className={styles.scene}>
      <div
        className={`${styles.craneContainer} ${
          newBlockId ? styles.slideIn : styles.slideOut
        }`}
      >
        {showCrane && (
          <div className={styles.crane}>
            <Crane height="220px" />
          </div>
        )}
        {showCrane && newBlockId && (
          <div className={styles.craneBlock}>
            <Block id={newBlockId} />
          </div>
        )}
      </div>

      <div className={styles.tower}>
        {currentPlayer.buildingBlocksId.map((blockId, index) => (
          <div
            key={index}
            className={`${styles.block} ${
              newBlockId === blockId ? styles.newBlock : ""
            }`}
            style={{
              zIndex: currentPlayer.buildingBlocksId.length + index,
              marginBottom: calcBlockMargin(index),
              position: "absolute",
              bottom: calcBlockMargin(index),
            }}
            data-block_id={blockId}
          >
            <Block id={blockId} />
          </div>
        ))}
        <Block id={0} />
      </div>
    </div>
  )
}

export default Scene
