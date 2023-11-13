import useGameActivity from "../../hooks/useGameActivity"
import { socket } from "../../socket"
import { Button } from "../../components"
import styles from "./styles.module.css"

interface SelectGameTimeProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const timeOptions = [
  {
    name: "5 min",
    seconds: 300,
  },
  {
    name: "10 min",
    seconds: 600,
  },
  {
    name: "15 min",
    seconds: 900,
  },
  {
    name: "20 min",
    seconds: 1200,
  },
  {
    name: "25 min",
    seconds: 1500,
  },
  {
    name: "30 min",
    seconds: 1800,
  },
  {
    name: "45 min",
    seconds: 2700,
  },
]

function SelectGameTime({ setStep }: SelectGameTimeProps) {
  const { gameActivity } = useGameActivity()

  const handleClick = (seconds: number) => {
    socket.emit("setTime", gameActivity.roomId, seconds)
    setStep(1)
  }

  return (
    <div className={styles.timeContainer}>
      {timeOptions.map((option) => (
        <Button
          key={option.seconds}
          onClick={() => handleClick(option.seconds)}
        >
          {option.name}
        </Button>
      ))}
    </div>
  )
}

export default SelectGameTime
