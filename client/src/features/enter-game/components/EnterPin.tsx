import { useState } from "react"
import { useQuery } from "react-query"
import toast from "react-hot-toast"
import { Button, Input, SpinnerOverlay } from "../../../components"
import useGameActivity from "../../../hooks/useGameActivity"
import { fetchRoomByPin } from "../../../api"
import useDelayedLoadingState from "../../../hooks/useDelayedLoadingState"

function EnterPin() {
  const [roomId, setRoomId] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { gameActivity, setGameActivity } = useGameActivity()

  const { isLoading } = useQuery({
    queryKey: ["roomByPin", isSubmitted],
    queryFn: () => fetchRoomByPin(roomId),
    enabled: !!isSubmitted,
    retry: 0,
    onSuccess: () => {
      setGameActivity({ ...gameActivity, roomId: roomId })
      setIsSubmitted(false)
    },
    onError: () => {
      toast.error("That Game PIN doesn't seem right")
      setIsSubmitted(false)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const showSpinnerOverlay = useDelayedLoadingState(isLoading, 200)

  return (
    <>
      {showSpinnerOverlay && <SpinnerOverlay label="Connecting" />}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", width: "100%", gap: "var(--8)" }}>
          <Input
            placeholder="Game PIN"
            size="lg"
            value={roomId}
            onChange={handleChange}
            autoFocus
            style={{ textAlign: "center" }}
          />
          <Button color="green" size="lg" disabled={isLoading}>
            Enter
          </Button>
        </div>
      </form>
    </>
  )
}

export default EnterPin
