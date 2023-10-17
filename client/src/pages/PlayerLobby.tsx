import { GameHeader, Spinner } from "../components"
import funFacts from "../assets/fun-facts.json"

function getRandomFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)]
}

function PlayerLobby() {
  return (
    <>
      <GameHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <div
          style={{
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            fontSize: "var(--20)",
            gap: "var(--36)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: "var(--28)" }}>
            <strong>You're in!</strong>
          </div>
          <div>
            <Spinner color="blue" />
          </div>
          <div
            style={{
              fontSize: "var(--16)",
              lineHeight: "var(--24)",
              color: "var(--neutral-700)",
              padding: "var(--16)",
            }}
          >
            <strong>Did you know?</strong> {getRandomFact()}
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerLobby
