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

| Method | Endpoint                 |  Description                                                                         |
| ------ | ------------------------ |  ----------------------------------------------------------------------------------- |
| GET    | `/api/user`              |  Returns ALL users registered                                                        |
| GET    | `/api/user/:id`          |  Returns user info (includes array of students+reminders) with the matching id       |
| GET    | `/api/user/:id/students` |  Returns a list of students belonging to a user with the matching id                 |
| GET    | `/api/user/:id/reminders`|  Returns a list of reminders belonging to a user with the matching id                |
| PUT    | `/api/user/:id`          |  Edits user with the matching id                                                     |
| DELETE | `/api/user/:id`          |  Deletes user with the matching id                                                   |

#### Student Routes

| Method | Endpoint                     |  Description                                                                       |
| ------ | -----------------------      |  --------------------------------------------------------------------------------- |
| GET    | `/api/students`              |  Returns ALL students in the database                                              |
| GET    | `/api/students/:id`          |  Returns student info (includes array of projects) with the corresponding id       |
| GET    | `/api/students/:id/projects` |  Returns a list of projects belonging to a student with the matching id            |
| POST   | `/api/students`              |  Creates a new student                                                             |
| PUT    | `/api/students/:id`          |  Edits info for student with corresponding id                                      |
| DELETE | `/api/students/:id`          |  Deletes student with the corresponding id                                         |

#### Project Routes

| Method | Endpoint                     |  Description                                        |
| ------ | -----------------------      |  -------------------------------------------------- |
| GET    | `/api/projects`              |  Returns ALL projects in the database               |
| GET    | `/api/project:id`            |  Returns project with the corresponding id          |
| POST   | `/api/projects`              |  Creates a new project                              |
| PUT    | `/api/projects/:id`          |  Edits info for project with corresponding id       |
| DELETE | `/api/projects/:id`          |  Deletes project with the corresponding id          |

#### Category Routes 

| Method | Endpoint                     |  Description                                         |
| ------ | -----------------------      |  --------------------------------------------------- |
| GET    | `/api/categories`            |  Returns a list of categories in the database        |
| GET    | `/api/categories:id`         |  Returns a category with the corresponding id        |

#### Reminders Routes

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
    email: STRING // required. must be unique
    password: STRING // required
}
```
#### STUDENTS
```js
{
    firstName: STRING // required
    lastName: STRING // required
    email: STRING // required
    professor_Id: NUMBER // required
}
```
#### PROJECTS
```js
{
    name: STRING // required
    deadline: STRING // a string for now until we can deal with date formats
    notes: STRING
    project_category: NUMBER // required. This will be a preset list. See below for list of categories.
    student_Id: NUMBER // required. This student must exist before a new project can be added
}
```
###### PROJECT CATEGORIES - Used when creating new projects.
```
1: Letter of recommendation
2: Referral
3: Help / Advice / Mentorship
4: Other
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
![alt text](https://github.com/BW-Better-Professor-App1/Backend/blob/master/betterprofessor_dbdesign.png "Better Professor Database Design")
