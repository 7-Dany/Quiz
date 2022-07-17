# Quiz island Backend

## Welcome! 👋

**Thanks for checking out my project ❤**

**Quiz island backend is an api for quiz island website**

**Note**

- **Be sure to update you .env file with environment variables**

### Table of contents

- [Overview](#overview)
    - [The Project](#The-Project)

- [My Process](#my-process)
    - [Built with](#built-with)
    - [Scripts to run](#scripts-to-run)
    - [Endpoints](#endpoints)
    - [Dependencies](#dependencies)
    - [Environment Variables](#environment-variables)
    - [Setting Up Database](#setting-up-database)
- [Author](#author)

## Overview

### The Project

You will be able to:

- Create user with first name , last name and password
- Authenticate user to access some routes
- Get user id, first name and last name [Must be Authenticated]
- Get all users' id, first name and lastname [Must be Authenticated]

## My Process

### Built with

- **TypeScript**
- **Express**
- **Node**
- **Postgres**

### Scripts to run

- To run _nodemon_

```
  npm run start
```

- To build _TypeScript_

```
  npm run build
```

### Endpoints

1. User Routes
    1. A Create route '/api/user' [POST]
    2. An Authenticate route '/api/user/authenticate' [POST]
    3. A Show User route '/api/user/:id' [GET]
    4. A Show all Users route '/api/user' [GET]
    5. To Update existing user '/api/user/:id' [PATCH]
    6. To Delete existing user '/api/user' [DELETE]

### Dependencies

- typescript
- Express
- pg
- db-migrate
- db-migrate-pg
- dotenv
- jsonwebtoken
- bcrypt
- jasmine
- jasmine Spec Reporter
- supertest

### Environment Variables

- PORT=4000
- ENV=dev
- POSTGRES_HOST=127.0.0.1
- POSTGRES_PORT=5432
- POSTGRES_DB=quiz
- POSTGRES_TEST_DB=quiz_test
- POSTGRES_USERNAME=YOUR-DATABASE-USERNAME
- POSTGRES_PASSWORD=YOUR-DATABASE-PASSWORD
- BCRYPT_PASSWORD=Your-bcrypt-password
- SALT_ROUNDS=10
- TOKEN_SECRET=Your-secret-token

### Setting Up Database

1. **Create User**

```postgresql
CREATE USER dany WITH PASSWORD 'dany245';
```

2. **Create Databases**

```postgresql
CREATE DATABASE quiz;
CREATE DATABASE quiz_test;
```

3. Grant all privileges to both databases

```postgresql
GRANT ALL PRIVILEGES ON DATABASE quiz TO dany;
GRANT ALL PRIVILEGES ON DATABASE quiz_test TO dany;
```

## Author

- GitHub - [Ali Ahmed](https://github.com/Dany-GitHub)