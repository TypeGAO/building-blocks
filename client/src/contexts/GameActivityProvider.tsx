import { ReactNode, createContext, useState, useEffect } from "react"
import { GameActivity, Player } from "../types"

interface GameActivityContextProps {
  children: ReactNode
}

interface GameActivityContextValue {
  gameActivity: GameActivity
  setGameActivity: React.Dispatch<React.SetStateAction<GameActivity>>
  currentPlayer: Player
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>
}

const GameActivityContext = createContext<GameActivityContextValue | undefined>(
  undefined
)

export const GameActivityProvider = ({
  children,
}: GameActivityContextProps) => {
  const [gameActivity, setGameActivity] = useState<GameActivity>({
    roomId: null,
    nickname: "",
    role: "player",
    stage: "landing",
    time: 600,
    players: [],
    questionSetId: 3,
  })

  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    roomId: null,
    nickname: "",
    score: 0,
    currentQuestion: 1,
    buildingBlocksId: [],
    currentQuestionId: 0,
    submissions: 0,
    currentCode: "",
    lastOutput: "",
    doneTime: ""
  })

  useEffect(() => {
    // Get player
    const foundPlayer = gameActivity.players.find(
      (player: Player) =>
        player.nickname === gameActivity.nickname &&
        player.roomId === gameActivity.roomId
    )
    if (foundPlayer) {
      setCurrentPlayer(foundPlayer)
    }
  }, [gameActivity.nickname, gameActivity.players, gameActivity.roomId])

  const contextValue: GameActivityContextValue = {
    gameActivity,
    setGameActivity,
    currentPlayer,
    setCurrentPlayer,
  }

  return (
    <GameActivityContext.Provider value={contextValue}>
      {children}
    </GameActivityContext.Provider>
  )
}

export default GameActivityContext
