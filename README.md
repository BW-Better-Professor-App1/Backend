# Backend
#### Development branch deployed at https://best-professor.herokuapp.com
##### Seeded information can be accessed by logging in with the following credentials
```
email: test@email.com
password: password
```

# Endpoints

#### Login/Register Routes

| Method | Endpoint                |  Description                                  |
| ------ | ----------------------- |  -------------------------------------------- |
| POST   | `/api/auth/login`       |  Logs in and returns token                    |
| POST   | `/api/auth/register`    |  Creates a new user and returns token         |


#### User/Professor Routes

| Method | Endpoint                |  Description                                                                   |
| ------ | ----------------------- |  ----------------------------------------------------------------------------- |
| GET    | `/api/user`             |  Returns ALL users registered                                                  |
| GET    | `/api/user/:id`         |  Returns user info (includes the array of students) with the matching id       |
| PUT    | `/api/user/:id`         |  Edits user with the matching id                                               |
| DELETE | `/api/user/:id`         |  Deletes user with the matching id                                             |

#### Student Routes

| Method | Endpoint                     |  Description                                                                       |
| ------ | -----------------------      |  --------------------------------------------------------------------------------- |
| GET    | `/api/students`              |  Returns ALL students in the database                                              |
| GET    | `/api/students/:id`          |  Returns student info (includes the array of projects) with the corresponding id   |
| POST   | `/api/students`              |  Creates a new student                                                             |
| PUT    | `/api/students/:id`          |  Edits info for student with corresponding id                                      |
| DELETE | `/api/students/:id`          |  Deletes student with the corresponding id                                         |

#### Project Routes (Not completed)

| Method | Endpoint                     |  Description                                        |
| ------ | -----------------------      |  -------------------------------------------------- |
| GET    | `/api/projects`              |  Returns ALL projects in the database               |
| GET    | `/api/project:id`            |  Returns project with the corresponding id          |
| POST   | `/api/projects`              |  Creates a new project                              |
| PUT    | `/api/projects/:id`          |  Edits info for project with corresponding id       |
| DELETE | `/api/projects/:id`          |  Deletes project with the corresponding id          |

#### Reminders Routes (Not completed)

| Method | Endpoint                     |  Description                                         |
| ------ | -----------------------      |  --------------------------------------------------- |
| GET    | `/api/reminders`             |  Returns ALL reminders in the database               |
| GET    | `/api/reminders:id`          |  Returns reminders with the corresponding id         |
| POST   | `/api/reminders`             |  Creates a new reminder                              |
| PUT    | `/api/reminders/:id`         |  Edits reminders with corresponding id               |
| DELETE | `/api/reminders/:id`         |  Deletes reminders with the corresponding id         |

# Data Schema

#### USERS/PROFESSORS
```js
{
    firstName: STRING // required
    lastName: STRING // required
    email: STRING // required. Must be unique
    password: STRING // required
}
```
#### STUDENTS
```js
{
    firstName: STRING // required
    lastName: STRING // required
    email: STRING // required. Must be unique
    professor_Id: NUMBER // required
}
```
#### PROJECTS
```js
{
    name: STRING // required
    deadline: STRING // a string for now until we can deal with date formats
    notes: STRING
    project_category: NUMBER // required. This category must exist before a new project can be added
    student_Id: NUMBER // required. This student must exist before a new project can be added
}
```
#### REMINDERS
```js
{
    name: STRING // required
    description: STRING
    send_date: STRING // a string for now until we can deal with date formats
    professor_Id: NUMBER // required. This professor must exist before a new reminder can be added
}
```
