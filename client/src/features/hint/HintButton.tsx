import { Button } from "../../components"
import CoinAmount from "../../components/coin-amount/CoinAmount"
import { socket } from "../../socket"

function HintButton() {
  const handleClick = () => {
    socket.emit("createHint")
  }

  return (
    <Button size="md" color="neutral" onClick={handleClick}>
        Hint <CoinAmount amount={150} size="sm" />
    </Button>
  )
}

export default HintButton
