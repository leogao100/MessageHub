### Updated `package.json`

```json
{
  "name": "restapi-project",
  "version": "1.0.0",
  "description": "A REST API project using Node.js, Express, and MongoDB.",
  "main": "app.js",
  "scripts": {
    "test": "mocha",
    "start": "nodemon app.js"
  },
  "author": "Leo Gao",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "dotenv": "^16.4.5",
    "esm": "^3.2.25",
    "express": "^4.19.2",
    "express-validator": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.0",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^3.1.0",
    "socket.io": "^4.7.5",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "chai": "^4.3.4",
    "mocha": "^8.4.0",
    "sinon": "^18.0.0"
  }
}
```

### Updated README

## REST API Project

### Overview
This is a REST API project developed using Node.js, Express, and MongoDB. The project includes user authentication, post creation, and other typical RESTful operations. The codebase is tested using Mocha, Chai, and Sinon.

### Requirements
- Node.js
- MongoDB
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/restapi-project.git
   cd restapi-project
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```sh
   DB_USER=<your-database-user>
   DB_PASSWORD=<your-database-password>
   DB_NAME=<your-database-name>
   ```

### Scripts
- Start the application:
  ```sh
  npm start
  ```
  This will start the server using `nodemon` which automatically restarts the server on code changes.

- Run tests:
  ```sh
  npm test
  ```
  This will run the test suite using `mocha`.

### Dependencies
- `bcrypt`: ^5.1.1 - Library for hashing passwords.
- `body-parser`: ^1.20.2 - Middleware for parsing request bodies.
- `dotenv`: ^16.4.5 - Loads environment variables from a `.env` file.
- `esm`: ^3.2.25 - ECMAScript module loader.
- `express`: ^4.19.2 - Web framework for Node.js.
- `express-validator`: ^7.1.0 - Middleware for validating request data.
- `jsonwebtoken`: ^9.0.2 - Library for generating and verifying JSON Web Tokens.
- `mongoose`: ^8.4.0 - MongoDB object modeling tool.
- `multer`: ^1.4.5-lts.1 - Middleware for handling file uploads.
- `nodemon`: ^3.1.0 - Utility for automatically restarting the server on code changes.
- `socket.io`: ^4.7.5 - Library for real-time web applications.
- `uuid`: ^9.0.1 - Library for generating UUIDs.

### Dev Dependencies
- `chai`: ^4.3.4 - Assertion library for testing.
- `mocha`: ^8.4.0 - Test framework.
- `sinon`: ^18.0.0 - Library for creating test spies, stubs, and mocks.

### Author
- Leo Gao

### License
This project is licensed under the ISC License. See the LICENSE file for details.

### Example Usage

To start the server:
```sh
npm start
```

To run the test suite:
```sh
npm test
```

### Folder Structure
```
restapi-project/
├── controller/
│   └── feed.js
│   └── auth.js
├── models/
│   └── user.js
│   └── post.js
├── test/
│   └── feed-controller.js
│   └── auth-controller.js
├── app.js
├── .env
├── package.json
└── README.md
```

### Testing
Tests are written using Mocha, Chai, and Sinon. To run the tests, execute:
```sh
npm test
```

### Explanation of the `Feed Controller - Login` Test
1. **Test Suite Initialization**:
    - Increase the test timeout to 20000ms.
    - Connect to MongoDB and create a test user before all tests.

2. **Test Case**: "should add a created post to the posts of the creator"
    - Stub the `User.findById` method to simulate finding a user.
    - Create a mock request object `req`.
    - Create a mock response object `res`.
    - Call `FeedController.createPost` with the mock request and response objects.
    - Assert that the saved user has a `posts` property with a length of 1.
    - Restore the stub and complete the test.

3. **Test Suite Cleanup**:
    - Delete all users and disconnect from MongoDB after all tests.

### Contribution
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.