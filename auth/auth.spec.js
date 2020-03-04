const request = require("supertest")
const server = require('../api/server')
const db = require('../database/dbConfig')

let registerResponse;
let loginResponse;

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

function randomizeName() {
    const randomNum = Math.floor(Math.random() * Math.floor(99));
    const randomNum2 = Math.floor(Math.random() * Math.floor(99));
    const randomNumString = randomNum.toString();
    const randomNumString2 = randomNum2.toString();
    const name = `john${randomNumString}doe${randomNumString2}@email.com`

    return name;
}