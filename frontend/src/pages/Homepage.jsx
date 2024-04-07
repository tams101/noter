import { useEffect, useState } from "react"
import { fetchNotes } from "../../utils/api"
import NoteList from "../components/NoteList"

function Homepage() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes('test@example.com').then((data) => {
      console.log(data)
      setNotes(data)
    })
  }, [])

  return (
    <div>
      <div>
        {notes && notes.map((note) => <NoteList key={note._id} note={note} />)}
      </div>
    </div>
  )
}

export default Homepage