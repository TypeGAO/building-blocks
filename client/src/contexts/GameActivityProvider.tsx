import { ReactNode, createContext, useState } from "react"
import { GameActivity } from "../types"

interface GameActivityContextProps {
  children: ReactNode
}

const GameActivityContext = createContext<
  | {
      gameActivity: GameActivity
      setGameActivity: React.Dispatch<React.SetStateAction<GameActivity>>
    }
  | undefined
>(undefined)

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
  })

  return (
    <GameActivityContext.Provider value={{ gameActivity, setGameActivity }}>
      {children}
    </GameActivityContext.Provider>
  )
}

export default GameActivityContext