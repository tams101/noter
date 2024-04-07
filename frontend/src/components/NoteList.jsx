
function NoteList({note}) {
  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </div>
  )
}

export default NoteList