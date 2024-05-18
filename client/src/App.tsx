import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"

export default function App() {
  const socket = io("http://localhost:3000")
  const [messages, setMessages] = useState<string[]>([])

  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handlePayload = (payload: string) =>
      setMessages((current) => [...current, payload])
    socket.on("chat-app", handlePayload)

    return () => {
      socket.off("chat-app", handlePayload)
    }
  }, [socket])

  const handleSubmit = () => {
    if (ref.current && ref.current.value) {
      const message = ref.current.value

      socket.emit("message", {
        channel: "chat-app",
        payload: message,
      })

      setMessages((current) => [...current, message])

      ref.current.value = ""
    }
  }

  return (
    <main className="flex h-dvh flex-col gap-2 p-8">
      <div className="flex grow flex-col justify-end overflow-y-scroll rounded border bg-slate-50 py-2">
        {messages.map((message, index) => (
          <div key={index} className="px-2">
            {message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <textarea
          ref={ref}
          className="grow resize-none rounded border bg-slate-50 p-2.5 text-sm"
          placeholder="Write your message here..."
        ></textarea>
        <button
          type="button"
          className="rounded bg-gray-800 px-5 py-2.5 text-sm text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </main>
  )
}
