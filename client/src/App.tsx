import { useEffect } from "react"
import { socket } from "./socket"
import useGameActivity from "./hooks/useGameActivity"
import Landing from "./pages/Landing"
import PlayerLobby from "./pages/PlayerLobby"
import { GameActivity } from "./types"
import HostLobby from "./pages/HostLobby"
import toast from "react-hot-toast"
import { RunCodeButton } from "./features/run-code"
import { PauseGameButton } from "./features/pause-game"
import { StartGameButton } from "./features/start-game"
import { Player } from "./types/index"

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
      toast.error("Name is Taken!");
    }

    function onHostLeft(data: GameActivity) {
      window.location.reload();
      socket.emit("hostLeft", data.roomId);
    }

    function onKickPlayer(nickname: string) {
      if (gameActivity.nickname === nickname) {
        window.location.reload();
      }
    }

    function onCannotJoinGame() {
      toast.error("Can't Join Game!");
    }

    function onWrong(output: string) {
      toast.error(`Wrong! Output: ${output}`);
    }

    function onCorrect(output: string) {
      toast.error(`Correct! Output: ${output}`);
    }

    socket.on("roomCreated", onRoomCreated)
    socket.on("roomJoined", onRoomJoined)
    socket.on("updateGameActivity", onUpdateGameActivity)
    socket.on("duplicateName", onDuplicateName);
    socket.on("hostLeft", onHostLeft);
    socket.on("kickPlayer", onKickPlayer);
    socket.on("cannotJoinGame", onCannotJoinGame);
    socket.on("correct", onCorrect);
    socket.on("wrong", onWrong);

    return () => {
      socket.off("roomCreated", onRoomCreated)
      socket.off("roomJoined", onRoomJoined)
      socket.off("updateGameActivity", onUpdateGameActivity)
      socket.off("duplicateName", onDuplicateName);
      socket.off("hostLeft", onHostLeft);
      socket.off("kickPlayer", onKickPlayer);
      socket.off("cannotJoinGame", onCannotJoinGame);
      socket.off("correct", onCorrect);
      socket.off("wrong", onWrong);
    }
  }, [gameActivity, setGameActivity])

  if (gameActivity.role === "host") {
    if (gameActivity.stage === "lobby") {
      return <HostLobby />
    }
    else if (gameActivity.stage == "started") {
      return (
        <div>
          <h1>Host View Game Started</h1>
          <ul>
            {gameActivity.players.map((player: Player) => (
              <li>
                {player.nickname}: {player.currentQuestion}
              </li>
            ))}
          </ul>
          <PauseGameButton roomId={gameActivity.roomId} />
        </div>
      )
    }
    else if (gameActivity.stage == "paused") {
        return (
            <div>
              <h1>Paused</h1>
              <StartGameButton roomId={gameActivity.roomId} players={gameActivity.players}/>
            </div>
        )
    }
  }

  if (gameActivity.role === "player") {
    if (gameActivity.stage === "lobby") {
      return <PlayerLobby />
    }
    else if (gameActivity.stage == "started") {
      let testCode = 
      `while True:
           print(\\"howdy\\");`;
      return (
        <div>
          <h1>Player View Game Started</h1>
          <h2>Question:  {gameActivity.players.find(
            (player: Player) =>
              player.nickname === gameActivity.nickname &&
              player.roomId === gameActivity.roomId
          )?.currentQuestion ?? 0}</h2>
          <h2>Score:  {gameActivity.players.find(
            (player: Player) =>
              player.nickname === gameActivity.nickname &&
              player.roomId === gameActivity.roomId
          )?.score ?? 0}</h2>
          <RunCodeButton roomId={gameActivity.roomId} code={testCode} nickname={gameActivity.nickname} questionId={1}/>
        </div>
      )
    }
    else if (gameActivity.stage == "paused") {
        return (
            <div>
              <h1>Paused</h1>
            </div>
        )
    }
  }

  return <Landing />
}

export default App
