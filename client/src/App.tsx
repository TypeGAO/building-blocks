import { useEffect, useState } from "react"
import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import Landing from "./pages/Landing"
import PlayerLobby from "./pages/PlayerLobby"
import { GameActivity } from "./types"
import HostLobby from "./pages/HostLobby"

/**
 * App Component
 *
 * The main component of the application responsible for managing game activity
 * and rendering different views based on the game state.
 */
function App() {
  const { gameActivity, setGameActivity } = useGameActivity()
  const [editorContent, setEditorContent] = useState('#your code here')

  useEffect(() => {
    function onRoomCreated(data: GameActivity) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players,
      })
    }

    function onUpdateGameActivity(data: GameActivity) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
      })
    }

    function onRoomNotFound(errorMessage: string) {
      alert(errorMessage)
    }

    function onPlayerCount(playerCount: number) {
      setGameActivity({ ...gameActivity, playerCount: playerCount })
    }

    socket.on("roomCreated", onRoomCreated)
    socket.on("roomJoined", onRoomJoined)
    socket.on("roomNotFound", onRoomNotFound)
    socket.on("playerCount", onPlayerCount)

    return () => {
      socket.off("roomCreated", onRoomCreated)
      socket.off("roomJoined", onRoomJoined)
      socket.off("roomNotFound", onRoomNotFound)
      socket.off("playerCount", onPlayerCount)
    }
  }, [gameActivity, setGameActivity])

  if (gameActivity.role === "host") {
    if (gameActivity.stage === "lobby") {
      return (
        <h1>
          Join with {gameActivity.roomId}, Connected: {gameActivity.playerCount}
        </h1>
      )
    }
  }

  if (gameActivity.role === "player") {
    if (gameActivity.stage === "lobby") {
      return <h1>Connected to {gameActivity.roomId}</h1>
    }
  }

  return <Landing />
}

export default App
