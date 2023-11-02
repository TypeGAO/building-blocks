import { ReactNode, createContext, useState, useEffect } from "react"
import { GameActivity, Player } from "../types"

interface GameActivityContextProps {
  children: ReactNode
}

interface GameActivityContextValue {
  gameActivity: GameActivity
  setGameActivity: React.Dispatch<React.SetStateAction<GameActivity>>
  currentPlayer: Player | null
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
    time: -1,
    players: [],
    questionSetId: 1
  })

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    // Get player
    const foundPlayer = gameActivity.players.find(
      (player: Player) =>
        player.nickname === gameActivity.nickname &&
        player.roomId === gameActivity.roomId
    )
    setCurrentPlayer(foundPlayer || null)
  }, [gameActivity.nickname, gameActivity.players, gameActivity.roomId])

  const contextValue: GameActivityContextValue = {
    gameActivity,
    setGameActivity,
    currentPlayer,
    setCurrentPlayer
  }

  return (
    <GameActivityContext.Provider value={contextValue}>
      {children}
    </GameActivityContext.Provider>
  )
}

export default GameActivityContext
