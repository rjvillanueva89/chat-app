import { useEffect } from "react"
import { io } from "socket.io-client"

interface Props<T> {
  channel: string
  onPayload: (payload: T) => void
}

export const useSocket = <T>({ channel, onPayload }: Props<T>) => {
  const socket = io("http://localhost:3000")
  const emit = (payload: T) => {
    socket.emit("message", { channel, payload })
  }
  useEffect(() => {
    socket.on(channel, onPayload)

    return () => {
      socket.off(channel, onPayload)
    }
  }, [socket, channel, onPayload])
  return { socket, emit }
}
