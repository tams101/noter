import { deleteNote } from "../../utils/api"

function NoteList({note, setNotes}) {

  const handleDelete = () => {
    deleteNote(note._id).then((res) => {
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