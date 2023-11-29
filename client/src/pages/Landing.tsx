import { useEffect, useState } from "react"

import { Header } from "../components"
import { EnterGame } from "../features/enter-game"
import { CreateGameButton } from "../features/create-game"

function Landing() {
  const [isScreenSmall, setIsScreenSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 600)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {isScreenSmall ? (
        <Header />
      ) : (
        <Header rightElement={<CreateGameButton />} />
      )}
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
