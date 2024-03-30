const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose')
const { connectToDb, seedDb } = require('../seed');


beforeEach(async () => {
  await connectToDb()
  await seedDb()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("/api/notes", () => {
  test('GET: 200 Get notes for a single user (email)', () => {
    return request(app).get('/api/notes')
    .expect(200)
    .then(({body}) => {
      console.log(body, "BODY")
      const {notes} =  body;
      expect(notes.length).toBe(3)
    })
  })
  test('GET: 404 When given an invalid path', () => {
    return request(app).get('/api/simon').expect(404).then(({body}) => {
      expect(body.msg).toBe('path doesn\'t exist')
    })
  })
})
