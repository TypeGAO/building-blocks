import { useEffect } from "react"
import toast from "react-hot-toast"

import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import { GameActivity } from "./types"

import Landing from "./pages/Landing"
import PlayerLobby from "./pages/PlayerLobby"
import PlayerGame from "./pages/PlayerGame"
import HostLobby from "./pages/HostLobby"
import HostCreating from "./pages/HostCreating"
import HostGame from "./pages/HostGame"
import PlayerPaused from "./pages/PlayerPaused"
import DoneEnded from "./pages/DoneEnded"

/**
 * App Component
 *
 * The main component of the application responsible for managing game activity
 * and rendering different views based on the game state.
 */
function App() {
  const { gameActivity, setGameActivity } = useGameActivity()

  useEffect(() => {
    const onRoomCreated = (data: GameActivity) => {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players,
      })
    }

    const onUpdateGameActivity = (data: GameActivity) => {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players,
        questionSetId: data.questionSetId,
      })
    }

    const onRoomJoined = (data: GameActivity) => {
      setGameActivity({
        ...gameActivity,
        roomId: data.roomId,
        stage: data.stage,
        role: data.role,
        time: data.time,
        players: data.players,
        questionSetId: data.questionSetId,
      })
    }

    const onDuplicateName = () => {
      toast.error("Name is Taken!")
    }

    const onHostLeft = (data: GameActivity) => {
      window.location.reload()
      localStorage.clear()
      socket.emit("hostLeft", data.roomId)
    }

    const onKickPlayer = (nickname: string) => {
      if (gameActivity.nickname === nickname) {
        window.location.reload()
        localStorage.clear()
      }
    }

    const onCannotJoinGame = () => {
      toast.error("Can't Join Game!")
    }

    const onWrong = () => {
      toast.error(`Incorrect!`)
    }

    const onCorrect = () => {
      toast.success(`Correct!`)
    }

    const onMessage = (msg: string) => {
      toast.error(`${msg}`)
    }

    const onEnded = () => {
      socket.disconnect()
    }

    const onStageChange = (stage: string) => {
      setGameActivity({
        ...gameActivity,
        stage: stage,
      })
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
    socket.on("stageChange", onStageChange)
    socket.on("ended", onEnded)

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
      socket.off("stageChange", onStageChange)
      socket.off("ended", onEnded)
    }
  }, [gameActivity, setGameActivity])

  if (gameActivity.role === "host") {
    switch (gameActivity.stage) {
      case "lobby":
        return <HostLobby />
      case "creating":
        return <HostCreating />
      case "started":
        return <HostGame />
      case "paused":
        return <HostGame isPaused />
      case "ended":
        return <HostGame isEnded />
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
        return <PlayerGame isDone />
      case "ended":
        return <DoneEnded title="Game Ended!" />
    }
  }

  return <Landing />
}

export default App
