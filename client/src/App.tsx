import { useEffect, useState } from "react"
import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import Landing from "./pages/Landing"
import TextEditor from "./components/text-editor/TextEditor"

/**
 * App Component
 *
 * The main component of the application responsible for managing game activity
 * and rendering different views based on the game state.
 */
function App() {
  const { gameActivity, setGameActivity } = useGameActivity()
  const [showEditor, setShowEditor] = useState(gameActivity.role === "player" && gameActivity.stage === "lobby")

  useEffect(() => {
    function onRoomCreated(data: {
      roomId: string
      stage: string
      role: string
    }) {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
      })
    }

    function onRoomJoined(data: {
      roomId: string
      stage: string
      role: string
    }) {
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

    if (gameActivity.role === "player" && gameActivity.stage === "lobby") {
      setShowEditor(true)
    }

    return () => {
      socket.off("roomCreated", onRoomCreated)
      socket.off("roomJoined", onRoomJoined)
      socket.off("roomNotFound", onRoomNotFound)
      socket.off("playerCount", onPlayerCount)
    }

  }, [gameActivity])

  if (gameActivity.role === "host") {
    if (gameActivity.stage === "lobby") {
      return (
        <div>
          <h1>
            Join with {gameActivity.roomId}, Connected: {gameActivity.playerCount}
          </h1>
          {/* {showEditor && 
          <TextEditor
            initialContent="# your code here"
            language="python"
            theme="myCustomTheme"
          />} */}
        </div>
      )
    }
  }

  if (gameActivity.role === "player") {
    if (gameActivity.stage === "lobby") {
      return (
        <div>
          <h1>Connected to {gameActivity.roomId}</h1>
          {showEditor && 
          <TextEditor
            initialContent="# your code here"
            language="python"
          />}
        </div>
      )
    }
  }

  return <Landing />
}

export default App
