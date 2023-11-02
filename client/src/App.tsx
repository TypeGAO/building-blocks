import { useEffect } from "react"
import { socket } from "./socket"
import toast from "react-hot-toast"

import useGameActivity from "./hooks/useGameActivity"
import { GameActivity } from "./types"

import Landing from "./pages/Landing"
import PlayerLobby from "./pages/PlayerLobby"
import PlayerGame from "./pages/PlayerGame"
import HostLobby from "./pages/HostLobby"
import HostGame from "./pages/HostGame"
import PlayerPaused from "./pages/PlayerPaused"

import { StartGameButton } from "./features/start-game"

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

    function onDuplicateName() {
      toast.error("Name is Taken!")
    }

    function onHostLeft(data: GameActivity) {
      window.location.reload()
      localStorage.clear()
      socket.emit("hostLeft", data.roomId)
    }

    function onKickPlayer(nickname: string) {
      if (gameActivity.nickname === nickname) {
        window.location.reload()
        localStorage.clear()
      }
    }

    function onCannotJoinGame() {
      toast.error("Can't Join Game!")
    }

    function onWrong(output: string) {
      toast.error(`Incorrect!`)
    }

    function onCorrect(output: string) {
      toast.success(`Correct!`)
    }

    function onMessage(msg: string) {
      toast.error(`${msg}`);
    }
    socket.on("roomCreated", onRoomCreated)
    socket.on("roomJoined", onRoomJoined)
    socket.on("updateGameActivity", onUpdateGameActivity)
    socket.on("duplicateName", onDuplicateName)
    socket.on("hostLeft", onHostLeft)
    socket.on("kickPlayer", onKickPlayer)
    socket.on("cannotJoinGame", onCannotJoinGame)
    socket.on("correct", onCorrect)
    socket.on("wrong", onWrong)
    socket.on("message", onMessage)

    return () => {
      socket.off("roomCreated", onRoomCreated)
      socket.off("roomJoined", onRoomJoined)
      socket.off("updateGameActivity", onUpdateGameActivity)
      socket.off("duplicateName", onDuplicateName)
      socket.off("hostLeft", onHostLeft)
      socket.off("kickPlayer", onKickPlayer)
      socket.off("cannotJoinGame", onCannotJoinGame)
      socket.off("correct", onCorrect)
      socket.off("wrong", onWrong)
      socket.off("message", onMessage)
    }
  }, [gameActivity, setGameActivity])

  if (gameActivity.role === "host") {
    switch (gameActivity.stage) {
      case "lobby":
        return <HostLobby />
      case "started":
        return <HostGame />
      case "paused":
        return (
            <div>
                <HostGame />
                <StartGameButton roomId={gameActivity.roomId} players={gameActivity.players}/>
            </div>
        )
    }
  }

  if (gameActivity.role === "player") {
    switch (gameActivity.stage) {
      case "lobby":
        return <PlayerLobby />
      case "started":
        return <PlayerGame />
      case "paused":
        return <PlayerPaused />
      case "done":
        return <h1>DONE!</h1>
    }
  }

  return <Landing />
}

export default App
