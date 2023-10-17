import { Header } from "../components"
import { EnterGame } from "../features/enter-game"
import { CreateGameButton } from "../features/create-game"

function Landing() {
  return (
    <>
      <Header rightElement={<CreateGameButton />} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          style={{ width: "250px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div style={{ display: "grid", width: "100%", gap: "var(--8)" }}>
            <EnterGame />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
