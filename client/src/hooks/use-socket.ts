import { useEffect } from "react"
import { io } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000"

interface Props<T> {
  channel: string
  onPayload: (payload: T) => void
}

export const useSocket = <T>({ channel, onPayload }: Props<T>) => {
  const socket = io(SOCKET_URL)
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
