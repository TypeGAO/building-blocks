import { Spinner } from "../components"

function PlayerLobby() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          fontSize: "var(--20)",
          gap: "var(--28)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "var(--28)" }}>
          <strong>You're in!</strong> Waiting for other players
        </div>
        <div>
          <Spinner size="md" color="blue" />
        </div>
      </div>
    </div>
  )
}

export default PlayerLobby
