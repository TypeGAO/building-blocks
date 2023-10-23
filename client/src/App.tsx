import { useEffect, useState } from "react"
import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import Landing from "./pages/Landing"
import PlayerLobby from "./pages/PlayerLobby"
import { GameActivity } from "./types"
import HostLobby from "./pages/HostLobby"
import TextEditor from "./components/text-editor/TextEditor"

/**
 * App Component
 *
 * The main component of the application responsible for managing game activity
 * and rendering different views based on the game state.
 */
function App() {
  const { gameActivity, setGameActivity } = useGameActivity()
  const [editorContent, setEditorContent] = useState('')

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

    socket.on("roomCreated", onRoomCreated)
    socket.on("roomJoined", onRoomJoined)
    socket.on("updateGameActivity", onUpdateGameActivity)

    return () => {
      socket.off("roomCreated", onRoomCreated)
      socket.off("roomJoined", onRoomJoined)
      socket.off("updateGameActivity", onUpdateGameActivity)
    }
  }, [gameActivity, setGameActivity])

  if (gameActivity.role === "host") {
    if (gameActivity.stage === "lobby") {
      return <HostLobby />
    }
  }

  if (gameActivity.role === "player") {
    if (gameActivity.stage === "lobby") {
      return (
        <div>
          <PlayerLobby />
          <TextEditor 
            value={editorContent}
            onChange={(newValue) => setEditorContent(newValue)}
          />
        </div>
      )
    }
  }

  return <Landing />
}

export default App