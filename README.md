# DevTo replica - API

The API is oriented toward user and publication management, providing functionalities with authentication, user data handling, and publication content. It also incorporates principles of clean architecture, ensuring the API is well-structured with a modular, scalable, and maintainable approach.

## Features

- **Modular Routing:** Separate route files for users, posts, and authentication.
- **Data Models:** Structured models for users and posts.
- **Middleware:** Support for authentication and validation.
- **RESTful Design:** Follows REST principles for API structure.
- **Scalable:** Clean and maintainable architecture.

## Getting Started

To get started with the project, follow these steps:

1. Clone this repository to your Linux console:
   ```bash
   git git@github.com:LSCasas/DevTo-API.git
   cd DevTo-API


2. Install dependencies:
   ```bash
   npm install


3. Start the development server:
   ```bash
    npm run dev


## How to Run

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Create an `.env` file**

    ```bash
    touch .env
    ```

    You can find the keys needed in the `example.env` file.

3. **Run in development mode**

    ```bash
    npm run dev
    ```

4. **Run in production mode**

    ```bash
    npm start
    ```

    ## Learn More

To learn more about Express, Mongoose, and using environment variables, check out the following resources:

- [Express Documentation](https://expressjs.com) - Learn about Express.js features.
- [Mongoose Documentation](https://mongoosejs.com) - Learn about Mongoose and MongoDB integration.
- [Dotenv Documentation](https://www.npmjs.com/package/dotenv) - Learn about managing environment variables in Node.js.

Your feedback and contributions to this project are welcome!
