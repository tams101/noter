import { deleteNote } from "../../utils/api"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function NoteList({note, setNotes}) {
  const {user} = useContext(AuthContext)

  const handleDelete = () => {
    if(!user) {
      return
    }
    deleteNote(user, note._id).then((res) => {
      setNotes((prevNotes) => {
        return prevNotes.filter((n) => n._id !== note._id )
      })
    })
  }

  return (
    <div className="note-item" >
      <div className="note-header">
        <button onClick={handleDelete}>X</button>
      </div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.category}</p>
    </div>
  )
}

export default NoteList