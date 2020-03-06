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

describe('students router', () => {
    let createStudentResponse;

    describe('POST /api/students/', () => {
        it('returns status 201 created', async () => {
            await request(server).post('/api/students')
                .set('Authorization', loginResponse.body.token)
                .send({
                    firstName: "Student fname",
                    lastName: "Student lname",
                    email: "something@email.com",
                    professor_Id: loginResponse.body.id
                })
                .then(res => {
                    createStudentResponse = res;
                    expect(res.status).toBe(201)
                })
        })

        it('returns a success message and the added student', async () => {
            expect(createStudentResponse.body).toEqual(expect.objectContaining({
                message: "Successfully added a new student.",
                student: createStudentResponse.body.student
            }))
        })
    })

    describe('GET /api/students/', () => {
        it('returns status 200', async () => {
            await request(server).get('/api/students/')
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('gets a list of all students in the database', async () => {
            await request(server).get('/api/students/')
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(Array.isArray(res.body)).toBe(true)
                })
        })
    })

    describe('GET /api/students/:id', () => {
        it('returns status 200 ok', async () => {
            await request(server).get(`/api/students/${createStudentResponse.body.student.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('gets specific students info from the database', async () => {
            await request(server).get(`/api/students/${createStudentResponse.body.student.id}`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.body).toEqual(expect.objectContaining({
                        firstName: createStudentResponse.body.student.firstName,
                        lastName: createStudentResponse.body.student.lastName,
                        email: createStudentResponse.body.student.email,
                        professor_Id: createStudentResponse.body.student.professor_Id,
                        projects: expect.any(Array)
                    }))
                })
        })
    })

    describe('GET /api/students/:id/projects', () => {
        it('returns status 200 ok', async () => {
            await request(server).get(`/api/students/${createStudentResponse.body.student.id}/projects`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('returns an array of projects belonging to a specific student', async () => {
            await request(server).get(`/api/students/${createStudentResponse.body.student.id}/projects`)
                .set('Authorization', loginResponse.body.token)
                .then(res => {
                    expect(res.body).toEqual(expect.any(Array))
                })
        })
    })

    describe('PUT /api/students/:id', () => {
        let updatedResponse;

        it('returns status 200 ok', async () => {
            await request(server).put(`/api/students/${createStudentResponse.body.student.id}`)
                .set('Authorization', loginResponse.body.token)
                .send({
                    firstName: "updated first name",
                    lastName: "updated last name",
                    email: "updated@email.com",
                    professor_Id: loginResponse.body.id
                })
                .then(res => {
                    updatedResponse = res;
                    expect(res.status).toBe(200)
                })
        })

        it('returns the updated student', async () => {
            expect(updatedResponse.body).toEqual(expect.objectContaining({
                message: "Successfully updated student.",
                updatedStudent: updatedResponse.body.updatedStudent
            }))
        })
    })

    describe('DELETE /api/students/:id', () => {
        let deletedResponse;

        it('returns status 200 ok', async () => {
            await request(server).delete(`/api/students/${createStudentResponse.body.student.id}`)
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