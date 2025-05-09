import { useState } from "react"

export default function Home() {
  const [emoji, setEmoji] = useState("")
  const [status, setStatus] = useState("")
  const [roomID, setRoomID] = useState("")
  const [password, setPassword] = useState("")

  const anonID = getAnonID()

  const sendEmoji = async () => {
    if (Array.from(emoji).length !== 1) {
      return alert("絵文字1文字だけ送ってください")
    }
    const res = await fetch(`/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji, roomID, password, anonID }),
    })
    if (res.ok) {
      setStatus("送信しました")
      setEmoji("")
    } else {
      setStatus("送信失敗")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>匿名絵文字アプリ</h1>
      <input placeholder="ルームID" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
      <input placeholder="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="絵文字1つだけ" value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={2} />
      <button onClick={sendEmoji}>送信</button>
      <p>{status}</p>
    </div>
  )
}

function getAnonID() {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("anonID")
  if (!id) {
    id = "anon_" + Math.random().toString(36).slice(2, 10)
    localStorage.setItem("anonID", id)
  }
  return id
}
