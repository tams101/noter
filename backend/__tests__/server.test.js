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


describe("/api/user/register", () => {
  test("POST: 201 add a new user", async () => {
    const newUser = {
      email: 'joe@example.com',
      password: 'lemonade'
    }

    const res = await request(app).post('/api/user/register').send(newUser)
    
    const user = res.body

    expect(res.status).toBe(201)
    expect(user.email).toBe('joe@example.com')
    expect(typeof user.token).toBe('string')
  });
  test("POST: 400 when given a malformed body", async () => {
    const newUser = {
      email: '',
      password: ''
    }

    const res = await request(app).post('/api/user/register').send(newUser)
    
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('All fields must be completed')
  });
  test("POST: 400 when email is already registered", async () => {
    const newUser = {
      email: 'testing@example.com',
      password: 'passwoArd123AA'
    }

    const res = await request(app).post('/api/user/register').send(newUser)
    
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Email is already registered')
  })
  test("POST: 400 when password is less than 8 characters", async () => {
    const newUser = {
      email: 'testing@example.com',
      password: 'passwor'
    }

    const res = await request(app).post('/api/user/register').send(newUser)
    
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Password must be at least 8 characters')
  })
});

describe("/api/user/login", () => {
  test("POST: 200 login successfully", async () => {
    const newUser = {
      email: 'joe@example.com',
      password: 'lemonade'
    }

    await request(app).post('/api/user/register').send(newUser)

    const login = {
      email: 'joe@example.com',
      password: 'lemonade'
    }

    const res = await request(app).post('/api/user/login').send(login)

    const user = res.body

    expect(res.status).toBe(200)
    expect(user.email).toBe('joe@example.com')
    expect(typeof user.token).toBe('string')
  });
  test('POST: 400 when given an incorrect email', async () => {
    const login = {
      email: 'joe@example.com',
      password: 'lemonade'
    }

    const res = await request(app).post('/api/user/login').send(login)

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Incorrect email')
  });
  test("POST: 400 when given a malformed body", async () => {
    const login = {
      email: '',
      password: ''
    }

    const res = await request(app).post('/api/user/login').send(login)
    
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('All fields must be completed')
  });
  test("POST: 400 when given an incorrect password", async () => {
    const newUser = {
      email: 'joe@example.com',
      password: 'lemonade'
    }

    await request(app).post('/api/user/register').send(newUser)

    const login = {
      email: 'joe@example.com',
      password: 'lemonadelemonade'
    }

    const res = await request(app).post('/api/user/login').send(login)

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Incorrect password')
  })
})

describe("/api/notes", () => {
  test("GET: 200 Get notes for a single user by email", async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app)
      .get(`/api/notes/testing@example.com`).set(
        'Authorization', `Bearer ${token}`)
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
  test("GET: 200 Get notes for a single user by email", async () => {
    const login = {
      email: 'testing2@example.com',
      password: 'passworD'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app)
      .get(`/api/notes/testing2@example.com`).set(
        'Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {

        const { notes } = body;
        expect(notes.length).toBe(1);
      });
  });
  test("GET: 404 error when given email that doesn't exist", async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app)
      .get(`/api/notes/invalid@example.com`).set(
        'Authorization', `Bearer ${token}`)
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
  test("POST: 201 Adding a new note, returns newly added note", async () => {
    const newNote = {
      title: "Holiday destinations",
      content: "Dubai, Barcelona, Japan",
      category: "Travel",
      email: "testing@example.com",
    };

    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token


    return request(app)
      .post("/api/notes")
      .set('Authorization', `Bearer ${token}`)
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
  test('POST: 400 when given a malformed body', async () => {
    const newNote = {
      title: "Holiday destinations",
      content: "Dubai, Barcelona, Japan",
      email: "testing@example.com",
    };

    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app).post('/api/notes')
    .set('Authorization', `Bearer ${token}`)  
    .send(newNote)
      .expect(400).then(({body}) => {
        expect(body.msg).toBe('Please complete all fields')
      })
  });
  test('PATCH: 200 update an existing note by ID', async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const loginRes = await request(app).post('/api/user/login').send(login)
    const token = loginRes.body.token

    const note = await Note.find({title: 'Workout'})
    const id = note[0]._id

    const res = await request(app).patch(`/api/notes/${id}`).set('Authorization', `Bearer ${token}`).send({content: '12 x press ups'})

      expect(res.status).toBe(200)
      expect(res.body.note.content).toBe('12 x press ups')

  }),
  test('PATCH: 400 return error when given an invalid ID', async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app).patch('/api/notes/1').set('Authorization', `Bearer ${token}`).send({content: '10 x press ups'})
      .expect(400).then(({body}) => {
        expect(body.msg).toBe('Note doesn\'t exist')
      })
  });
  test('PATCH: 404 return error if ID not found', async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app).patch('/api/notes/65d5dec7623525f596268010')
      .set('Authorization', `Bearer ${token}`)
      .send({content: '12 x pull ups'})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('ID does not exist')
      })
  })
  test('DELETE: 204 delete note by ID', async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const loginRes = await request(app).post('/api/user/login').send(login)
    const token = loginRes.body.token

    const note = await Note.find({title: 'Workout'})
    const id = note[0]._id

    const res = await request(app).delete(`/api/notes/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
  });
  test('DELETE: 400 when given an invalid ID', async () => {
    const login = {
      email: 'testing@example.com',
      password: 'password'
    }

    const res = await request(app).post('/api/user/login').send(login)
    const token = res.body.token

    return request(app).delete('/api/notes/abc').set('Authorization', `Bearer ${token}`).expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Note doesn\'t exist')
      })
  })
});
