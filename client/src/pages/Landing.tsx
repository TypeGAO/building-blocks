import EnterGame from "../features/enter-game/EnterGame"
import { Button, Header } from "../components"

function Landing() {
  return (
    <>
      <Header
        rightElement={
          <Button onClick={() => console.log("Clicked")} color="blue">
            Host your own game
          </Button>
        }
      />
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
