import axios from 'axios'

export function fetchNotes(email) {
  return axios.get(`http://localhost:4000/api/notes/${email}`).then((res) => {
      return res.data.notes
    })
}

export function addNote(newNote) {
  return axios.post(`http://localhost:4000/api/notes/`, newNote).then((res) => {
    return res.data
  })
}

export function deleteNote(id) {
  return axios.delete(`http://localhost:4000/api/notes/${id}`)
}

export function register(email, password) {
  return axios.post('http://localhost:4000/api/user/register', {email, password})
}

export function login(email, password) {
  return axios.post('http://localhost:4000/api/user/login', {email, password})
}