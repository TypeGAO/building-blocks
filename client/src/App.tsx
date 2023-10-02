import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"

const App = () => {
  const [socketClient, setSocketClient] = useState<Socket | null>(null)
  const [roomId, setRoomId] = useState<string>("")
  const [joinedRoom, setJoinedRoom] = useState<string>("")
  const [createdRoom, setCreatedRoom] = useState<string>("")
  const [participantCount, setParticipantCount] = useState<number>(0)

  useEffect(() => {
    const newSocket = io("http://localhost:3000")
    setSocketClient(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socketClient) {
      socketClient.on("roomJoined", (roomId: string) => {
        setJoinedRoom(roomId)
      })

      socketClient.on("roomCreated", (roomId: string) => {
        setCreatedRoom(roomId)
      })

      socketClient.on("gameActivity", (data: { playerCount: number }) => {
        setParticipantCount(data.playerCount)
      })

      socketClient.on("roomNotFound", (errorMessage: string) => {
        console.error(errorMessage)
      })
    }
  }, [socketClient])

  const handleJoinRoom = () => {
    if (roomId && socketClient) {
      socketClient.emit("joinRoom", roomId)
    }
  }

  const handleCreateRoom = () => {
    if (socketClient) {
      socketClient.emit("createRoom")
    }
  }

  if (createdRoom) {
    return (
      <p>
        Room: {createdRoom}, Players: {participantCount}
      </p>
    )
  }

  if (joinedRoom) {
    return <p>You are in room {joinedRoom} </p>
  }

  return (
    <div>
      <p>Enter room code:</p>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  )
}

export default App
