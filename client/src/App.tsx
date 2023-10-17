import { useEffect } from "react"
import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import Landing from "./pages/Landing"
import PlayerLobby from "./pages/PlayerLobby"
import { GameActivity } from "./types"

/**
 * App Component
 *
 * The main component of the application responsible for managing game activity
 * and rendering different views based on the game state.
 */
function App() {
  const { gameActivity, setGameActivity } = useGameActivity()

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
        time: data.time,
        players: data.players,
      })
    }

    function onRoomJoined(data: GameActivity) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players,
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

  console.log("gameActivity :: ", gameActivity)

  if (gameActivity.role === "host") {
    if (gameActivity.stage === "lobby") {
      return (
        <div>
          <h1>
            Join with {gameActivity.roomId}, Connected:{" "}
            {gameActivity.players.length}
          </h1>
          <h2>Players:</h2>
          {gameActivity.players.map((player) => (
            <li>{player.nickname}</li>
          ))}
        </div>
      )
    }
  }

  if (gameActivity.role === "player") {
    if (gameActivity.stage === "lobby") {
      return <PlayerLobby />
    }
  }

  return <Landing />
}

export default App
