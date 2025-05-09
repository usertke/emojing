let rooms = {}

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()
  const { emoji, roomID, password, anonID } = req.body
  if (!emoji || !roomID || !password || !anonID) return res.status(400).end()

  if (!rooms[roomID]) {
    rooms[roomID] = { password, messages: {} }
  }

  const room = rooms[roomID]
  if (room.password !== password) return res.status(403).end()

  const msgs = room.messages[anonID] || []
  if (msgs.length >= 2) return res.status(400).json({ error: "2件まで" })

  const msg = { id: Date.now(), emoji, viewed: false }
  msgs.push(msg)
  room.messages[anonID] = msgs

  return res.status(200).end()
}
