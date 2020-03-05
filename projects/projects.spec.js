const request = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

let registerResponse;
let loginResponse;
let studentInformation;

// need to register and login to get a token to gain access to users router
describe("auth router", () => {
  it("should delete all records in the users table within the testing environment", async () => {
    await db("Professors").delete();
  });

  describe("/api/auth/register", () => {
    let user = {
      firstName: "John",
      lastName: "Doe",
      email: randomizeName(),
      password: "password"
    };
    it("should register a new account and return status 201", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(user)
        .then(res => {
          registerResponse = res;
          expect(res.status).toBe(201);
        });
    });

    it("should return an object with new user info and a token", async () => {
      let response = {
        message: "Successfully created a new user.",
        firstName: registerResponse.body.firstName,
        lastName: registerResponse.body.lastName,
        email: registerResponse.body.email,
        id: registerResponse.body.id,
        token: registerResponse.body.token
      };
      expect(registerResponse.body).toEqual(expect.objectContaining(response));
    });
  });

  describe("/api/auth/login", () => {
    it("should login and return status 200", async () => {
      await request(server)
        .post("/api/auth/login")
        .send({
          email: registerResponse.body.email,
          password: "password"
        })
        .then(res => {
          loginResponse = res;
          expect(res.status).toBe(200);
        });
    });

    it("should login and return the user info and a token", async () => {
      expect(loginResponse.body).toEqual(
        expect.objectContaining({
          message: `Welcome back, ${loginResponse.body.firstName}!`,
          firstName: loginResponse.body.firstName,
          lastName: loginResponse.body.lastName,
          email: loginResponse.body.email,
          id: loginResponse.body.id,
          token: loginResponse.body.token
        })
      );
    });
  });
});

describe("get student information", () => {
  it("makes a new student", async () => {
    await request(server)
      .post("/api/students")
      .set("Authorization", loginResponse.body.token)
      .send({
        firstName: "jeffrey",
        lastName: "polanco",
        email: randomizeName(),
        professor_Id: loginResponse.body.id
      })
      .then(res => {
        studentInformation = res;
        expect(res.status).toBe(201);
      });
  });
});

describe("projects router", () => {
  let projectResponse;

  describe("create new project /api/projects", () => {
    it("test for status code 201:created", async () => {
      // console.log(studentInformation.body);
      await request(server)
        .post("/api/projects")
        .set("Authorization", loginResponse.body.token)
        .send({
          name: "hello there",
          deadline: "hopefully one day",
          notes: "might be needed",
          student_Id: studentInformation.body.student.id,
          project_category: 2
        })
        .then(res => {
          projectResponse = res;
          expect(res.status).toBe(201);
        });
    });
  });

  describe("get list of all projects /api/projects", () => {
    it("test for status code 200", async () => {
      // console.log(projectResponse.body);
      await request(server)
        .get("/api/projects")
        .set("Authorization", loginResponse.body.token)
        .then(res => expect(res.status).toBe(200));
    });
    it("gets a list of all projects in the database", async () => {
      await request(server)
        .get("/api/projects")
        .set("Authorization", loginResponse.body.token)
        .then(res => expect(Array.isArray(res.body)).toBe(true));
    });
  });

  describe("get a project specified by its id", () => {
    it("test for status code 200", async () => {
      // console.log(projectResponse.body);
      await request(server)
        .get(`/api/projects/${projectResponse.body.id}`)
        .set("Authorization", loginResponse.body.token)
        .then(res => expect(res.status).toBe(200));
    });
  });

  describe("updates an existing project by id", () => {
    it("test for status code 200", async () => {
      let newProject = {
        name: "it's workingg",
        deadline: "nowww",
        notes: "not needed",
        student_Id: studentInformation.body.student.id,
        project_category: 1
      };
      await request(server)
        .put(`api/projects.${projectResponse.body.id}`)
        .set("Authorization", loginResponse.body.token)
        .send(newProject)
        .then(res => expect(res.status).toBe(200));
    });
  });

  describe("deletes a project by id", () => {
    it("test for status code 201", async () => {
      await request(server)
        .delete(`api/projects.${projectResponse.body.id}`)
        .set("Authorization", loginResponse.body.token)
        .then(res => expect(res.status).toBe(201));
    });
  });
});

function randomizeName() {
  const randomNum = Math.floor(Math.random() * Math.floor(99));
  const randomNum2 = Math.floor(Math.random() * Math.floor(99));
  const randomNumString = randomNum.toString();
  const randomNumString2 = randomNum2.toString();
  const name = `john${randomNumString}doe${randomNumString2}@email.com`;

  return name;
}
