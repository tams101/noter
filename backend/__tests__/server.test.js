const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const { connectToDb, seedDb } = require("../seed");
const Note = require("../schemas/note.schema");

beforeEach(async () => {
  await connectToDb();
  await seedDb();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/notes", () => {
  test("GET: 200 Get notes for a single user by email", () => {
    return request(app)
      .get(`/api/notes/test@example.com`)
      .expect(200)
      .then(({ body }) => {
        const { notes } = body;
        
        notes.forEach((note) => {
          expect(note).toHaveProperty('_id')
          expect(note).toHaveProperty('title')
          expect(note).toHaveProperty('content')
          expect(note).toHaveProperty('email')
          expect(note).toHaveProperty('createdAt')
          expect(note).toHaveProperty('updatedAt')
        })
      });
  });
  test("GET: 200 Get notes for a single user by email", () => {
    return request(app)
      .get(`/api/notes/test2@example.com`)
      .expect(200)
      .then(({ body }) => {

        const { notes } = body;
        expect(notes.length).toBe(1);
      });
  });
  test("GET: 404 error when given email that doesn't exist", () => {
    return request(app)
      .get(`/api/notes/invalid@example.com`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Email doesn\'t exist')
      });
  })
  test("GET: 404 When given an invalid path", () => {
    return request(app)
      .get("/api/simon")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path doesn't exist");
      });
  });
  test("POST: 201 Adding a new note, returns newly added note", () => {
    const newNote = {
      title: "Holiday destinations",
      content: "Dubai, Barcelona, Japan",
      category: "Travel",
      email: "example@test.com",
    };

    return request(app)
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .then(({ body }) => {
        const { note } = body;
        expect(typeof note._id).toBe("string")
        expect(typeof note.category).toBe("string")
        expect(typeof note.content).toBe("string")
        expect(typeof note.email).toBe("string")
        expect(typeof note.title).toBe("string")
        expect(typeof note.createdAt).toBe("string")
        expect(typeof note.updatedAt).toBe("string")
      });
  });
  test('POST: 400 when given a malformed body', () => {
    const newNote = {
      title: "Holiday destinations",
      content: "Dubai, Barcelona, Japan",
      email: "example@test.com",
    };

    return request(app).post('/api/notes').send(newNote)
      .expect(400).then(({body}) => {
        expect(body.msg).toBe('Please complete all fields')
      })
  });
  test('PATCH: 200 update an existing note by ID', async () => {
    const note = await Note.find({title: 'Workout'})
    const id = note[0]._id

    const res = await request(app).patch(`/api/notes/${id}`).send({content: '12 x press ups'})

      expect(res.status).toBe(200)
      expect(res.body.note.content).toBe('12 x press ups')

  }),
  test('PATCH: 400 return error when given an invalid ID', () => {
    return request(app).patch('/api/notes/1').send({content: '10 x press ups'})
      .expect(400).then(({body}) => {
        expect(body.msg).toBe('Note doesn\'t exist')
      })
  });
  test('PATCH: 404 return error if ID not found', () => {
    return request(app).patch('/api/notes/65d5dec7623525f596268010')
      .send({content: '12 x pull ups'})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('ID does not exist')
      })
  })
  test('DELETE: 204 delete note by ID', async () => {
    const note = await Note.find({title: 'Workout'})
    const id = note[0]._id

    const res = await request(app).delete(`/api/notes/${id}`)
    expect(res.status).toBe(204)
  });
  test('DELETE: 400 when given an invalid ID', () => {
    return request(app).delete('/api/notes/abc').expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Note doesn\'t exist')
      })
  })
});