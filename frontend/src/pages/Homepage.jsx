import { useEffect, useState, useContext } from "react"
import { addNote, fetchNotes } from "../../utils/api"
import NoteList from "../components/NoteList"
import {AuthContext} from "../../context/AuthContext"

function Homepage() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const {dispatch, user} = useContext(AuthContext)

  useEffect(() => {
    if(user) {
      fetchNotes(user).then((data) => {
        console.log(data)
        setNotes(data)
      })

    }
  }, [dispatch, user])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const newNote = {email: user.email, title, category, content}

    setNotes((prevNotes) => [...prevNotes, {title, category, content}])


    addNote(user, newNote).then((res) => {
      setError('')
    }).catch((err) => {
      setError('Something went wrong. Please try again.')
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note.title !== title)
        })
      })
  }

  return (
    <div className="homepage-container">
        {error && <div>{error}</div>}
        <form className="note-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            type="text" 
            required 
            value={title}
            onChange={((e) => {setTitle(e.target.value)})}  
          />

          <label htmlFor="category">Category</label>
          <input 
            id="category"
            type="text" 
            required
            value={category} 
            onChange={((e) => {setCategory(e.target.value)})}
            />

          <label htmlFor="content-input">Content</label>
          <textarea 
            id="content-input" 
            rows={10} 
            required
            value={content}
            onChange={((e) => {setContent(e.target.value)})}  
          >
          </textarea>

          <button type="submit">Add note</button>
        </form>

      <div className="notes-grid">
        {notes && notes.map((note) => <NoteList key={note._id} note={note} setNotes={setNotes} />)}
      </div>
    </div>
  )
}

export default Homepage