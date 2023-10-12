import { useEffect } from "react"
import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import Landing from "./pages/Landing"
/**
 * App Component
 *
 * The main component of the application responsible for managing game activity
 * and rendering different views based on the game state.
 */
function App() {
  const { gameActivity, setGameActivity } = useGameActivity()

  useEffect(() => {
    function onRoomCreated(data: {
      roomId: string
      stage: string
      role: string
      time: int
      players: [Player]
    }) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players
      })
    }

    function onUpdateGameActivity(data: {
      roomId: string
      stage: string
      role: string
      time: int
      players: [Player]
    }) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players
      })
    }

    function onRoomJoined(data: {
      roomId: string
      stage: string
      role: string
      time: int
      players: [Player]
    }) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players
      })
    }

    function onRoomNotFound(errorMessage: string) {
      alert(errorMessage)
    }

    socket.on("roomCreated", onRoomCreated)
    socket.on("roomJoined", onRoomJoined)
    socket.on("roomNotFound", onRoomNotFound)
    socket.on("updateGameActivity", onUpdateGameActivity)

    return () => {
      socket.off("roomCreated", onRoomCreated)
      socket.off("roomJoined", onRoomJoined)
      socket.off("roomNotFound", onRoomNotFound)
      socket.off("updateGameActivity", onUpdateGameActivity)
    }
  }, [gameActivity, setGameActivity])

  if (gameActivity.role === "host") {
    if (gameActivity.stage === "lobby") {
      return (
        <div>
            <h1>
              Join with {gameActivity.roomId}, Connected: {gameActivity.players.length}
            </h1>
        </div>
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
