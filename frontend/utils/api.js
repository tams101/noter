import axios from 'axios'

export function fetchNotes(email) {
  return axios.get(`http://localhost:4000/api/notes/${email}`).then((res) => {
      return res.data.notes
    })
}