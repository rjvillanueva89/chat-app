export default function App() {
  return (
    <main className="flex h-dvh flex-col gap-2 p-8">
      <div className="flex grow flex-col justify-items-end gap-2 overflow-y-scroll rounded border bg-slate-50"></div>
      <div className="flex gap-2">
        <textarea
          className="grow resize-none rounded border bg-slate-50 p-2.5 text-sm"
          placeholder="Write your message here..."
        ></textarea>
        <button
          type="button"
          className="rounded bg-gray-800 px-5 py-2.5 text-sm  text-white hover:bg-gray-900 "
        >
          Send
        </button>
      </div>
    </main>
  )
}
