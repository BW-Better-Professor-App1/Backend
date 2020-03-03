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
                    email: "test@email.com",
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

describe('users router', () => {

    describe('GET /api/users/', () => {
        it('returns status 200', async () => {
            await request(server).get('/api/users/')
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('gets a list of all users in the database', async () => {
            await request(server).get('/api/users/')
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(Array.isArray(res.body)).toBe(true)
                })
        })
    })

    describe('GET /api/users/:id', () => {
        it('returns status 200 ok', async () => {
            await request(server).get(`/api/users/${loginResponse.body.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('gets specific user info from the database', async () => {
            await request(server).get(`/api/users/${loginResponse.body.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.body).toEqual(expect.objectContaining({
                        firstName: res.body.firstName,
                        lastName: res.body.lastName,
                        email: res.body.email,
                        id: res.body.id,
                        students: expect.any(Array),
                        reminders: expect.any(Array)
                    }))
                })
        })
    })

    describe('GET /api/users/:id/students', () => {
        it('returns status 200 ok', async () => {
            await request(server).get(`/api/users/${loginResponse.body.id}/students`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('returns an array of students belonging to a specific user', async () => {
            await request(server).get(`/api/users/${loginResponse.body.id}/students`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.body).toEqual(expect.any(Array))
                })
        })
    })

    describe('GET /api/users/:id/reminders', () => {
        it('returns status 200 ok', async () => {
            await request(server).get(`/api/users/${loginResponse.body.id}/reminders`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('returns an array of reminders belonging to a specific user', async () => {
            await request(server).get(`/api/users/${loginResponse.body.id}/reminders`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.body).toEqual(expect.any(Array))
                })
        })
    })

    describe('PUT /api/users/:id', () => {
        let updatedResponse;

        it('returns status 200 ok', async () => {
            await request(server).put(`/api/users/${loginResponse.body.id}`)
                .set('Authorization', loginResponse.body.token)
                .send({
                    firstName: "updated first name",
                    lastName: "updated last name",
                    email: "updated@email.com",
                    password: "password2"
                })
                .then(res => {
                    updatedResponse = res;
                    expect(res.status).toBe(200)
                })
        })

        it('returns the updated user', async () => {
            expect(updatedResponse.body).toEqual(expect.objectContaining({
                message: "Successfully updated user.",
                updatedUser: updatedResponse.body.updatedUser
            }))
        })
    })

    describe('DELETE /api/users/:id', () => {
        let deletedResponse;

        it('returns status 200 ok', async () => {
            await request(server).delete(`/api/users/${loginResponse.body.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    deletedResponse = res;
                    expect(res.status).toBe(200)
                })
        })

        it('returns a successfully deleted message', async () => {
            expect(deletedResponse.body).toEqual(expect.objectContaining({
                message: deletedResponse.body.message
            }))
        })
    })
})