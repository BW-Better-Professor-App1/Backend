const request = require("supertest")
const server = require('../api/server')
const db = require('../database/dbConfig')

let registerResponse;
let loginResponse;

// need to register and login to get a token to gain access to users router
describe('auth router', () => {
    it('should delete all records in the users table within the testing environment', async () => {
        await db('Professors').delete()
    })

    describe('/api/auth/register', () => {
        it('should register a new account and return status 201', async () => {
            await request(server).post('/api/auth/register')
                .send({
                    firstName: "John",
                    lastName: "Doe",
                    email: randomizeName(),
                    password: "password"
                })
                .then(res => {
                    registerResponse = res;
                    expect(res.status).toBe(201)
                })
        })

        it('should return an object with new user info and a token', async () => {
            expect(registerResponse.body).toEqual(expect.objectContaining({
                message: "Successfully created a new user.",
                firstName: registerResponse.body.firstName,
                lastName: registerResponse.body.lastName,
                email: registerResponse.body.email,
                id: registerResponse.body.id,
                token: registerResponse.body.token,
            }))
        })
    })

    describe('/api/auth/login', () => {
        it('should login and return status 200', async () => {
            await request(server).post('/api/auth/login')
                .send({
                    email: registerResponse.body.email,
                    password: 'password'
                })
                .then(res => {
                    loginResponse = res;
                    expect(res.status).toBe(200)
                })
        })

        it('should login and return the user info and a token', async () => {
            expect(loginResponse.body).toEqual(expect.objectContaining({
                message: `Welcome back, ${loginResponse.body.firstName}!`,
                firstName: loginResponse.body.firstName,
                lastName: loginResponse.body.lastName,
                email: loginResponse.body.email,
                id: loginResponse.body.id,
                token: loginResponse.body.token,
            }))
        })
    })
})

describe('reminders router', () => {
    let createReminderResponse;

    describe('POST /api/reminders/', () => {
        it('returns status 201 created', async () => {
            await request(server).post('/api/reminders')
                .set('Authorization', loginResponse.body.token)
                .send({
                    name: "a project name",
                    description: "some description",
                    send_date: "some date here",
                    professor_Id: loginResponse.body.id
                })
                .then(res => {
                    createReminderResponse = res;
                    expect(res.status).toBe(201)
                })
        })

        it('returns a success message and the added reminder', async () => {
            expect(createReminderResponse.body).toEqual(expect.objectContaining({
                message: "Successfully added a new reminder.",
                reminder: createReminderResponse.body.reminder
            }))
        })
    })

    describe('GET /api/reminders/', () => {
        it('returns status 200', async () => {
            await request(server).get('/api/reminders/')
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('gets a list of all reminders in the database', async () => {
            await request(server).get('/api/reminders/')
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(Array.isArray(res.body)).toBe(true)
                })
        })
    })

    describe('GET /api/reminders/:id', () => {
        it('returns status 200 ok', async () => {
            await request(server).get(`/api/reminders/${createReminderResponse.body.reminder.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('gets specific reminder info from the database', async () => {
            await request(server).get(`/api/reminders/${createReminderResponse.body.reminder.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.body).toEqual(expect.objectContaining({
                        name: createReminderResponse.body.reminder.name,
                        description: createReminderResponse.body.reminder.description,
                        send_date: createReminderResponse.body.reminder.send_date,
                        professor_Id: createReminderResponse.body.reminder.professor_Id,
                    }))
                })
        })
    })

    describe('PUT /api/reminders/:id', () => {
        let updatedResponse;

        it('returns status 200 ok', async () => {
            await request(server).put(`/api/reminders/${createReminderResponse.body.reminder.id}`)
                .set('Authorization', loginResponse.body.token)
                .send({
                    name: "updated name",
                    description: "updated description",
                    send_date: "updated send date",
                    professor_Id: loginResponse.body.id,
                })
                .then(res => {
                    updatedResponse = res;
                    expect(res.status).toBe(200)
                })
        })

        it('returns the updated reminder', async () => {
            expect(updatedResponse.body).toEqual(expect.objectContaining({
                message: "Successfully updated reminder.",
                updatedReminder: updatedResponse.body.updatedReminder
            }))
        })
    })

    describe('DELETE /api/reminders/:id', () => {
        let deletedResponse;

        it('returns status 200 ok', async () => {
            await request(server).delete(`/api/reminders/${createReminderResponse.body.reminder.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    deletedResponse = res;
                    expect(res.status).toBe(200)
                })
        })

        it('returns a "successfully deleted" message', async () => {
            expect(deletedResponse.body).toEqual(expect.objectContaining({
                message: deletedResponse.body.message
            }))
        })
    })
})

function randomizeName() {
    const randomNum = Math.floor(Math.random() * Math.floor(99));
    const randomNum2 = Math.floor(Math.random() * Math.floor(99));
    const randomNumString = randomNum.toString();
    const randomNumString2 = randomNum2.toString();
    const name = `john${randomNumString}doe${randomNumString2}@email.com`

    return name;
}