import useGameActivity from "../hooks/useGameActivity"

function HostLobby() {
  const { gameActivity } = useGameActivity()

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

export default HostLobby
