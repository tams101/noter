import axios from 'axios'

export function fetchNotes(user) {
  return axios.get(`http://localhost:4000/api/notes/${user.email}`, {headers: {
    'Authorization': `Bearer ${user.token}`
  }}).then((res) => {
      return res.data.notes
    })
}

export function addNote(user, newNote) {
  return axios.post(`http://localhost:4000/api/notes/`, newNote, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }).then((res) => {
    return res.data
  })
}

export function deleteNote(user, id) {
  return axios.delete(`http://localhost:4000/api/notes/${id}`, {headers: {
    'Authorization': `Bearer ${user.token}`
  }})
}

export function register(email, password) {
  return axios.post('http://localhost:4000/api/user/register', {email, password})
}

export function login(email, password) {
  return axios.post('http://localhost:4000/api/user/login', {email, password})
}