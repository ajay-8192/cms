# CMS

## Frontend Project Documentation

### Overview

The frontend project of our application is responsible for the user interface and client-side functionality. It interacts with the backend fetch and display data, handle user interactions, and provide a seamless user experience.

### Technologies Used

- React: A popular Javascript library for building user interfaces.
- Next.js: A React framework for server-rendered applications.

- Tailwind CSS: A utility-first CSS framework for styling components.

- Typescript: A statically typed superset of JavaScript for improved code quality.

### Folder Structure

- components: Contains reusable UI components.

- pages: Defines the routes and pages of the application.

- styles: Includes global styles and utility classes.

- utils: Houses utility functions used across the application.

### Key Components

- UserForm: Allows users to sign up, log in, and update their details.

- ProjectDetails: Displays information about specific project.

### API Integration

The frontend communicates with the backend through RESTful APIs to fetch and update data. It handles authentication, data retrieval, and error handling to provide a smooth user experience.

---

## Backend Project Documentation

### Overview

The backend project serves as the core of our application, handling data storage, business logic, and API endpoints. It interacts with the frontend to provide data and functionality to the client-side application.

### Technologies Used

- Node.js: A JavaScript runtime for building scalable server-side applications.

- Express: A web application framework for Node.js.

- MongoDB: A NoSQL database for storing application data.

- Mongoose: An ODM library for MongoDB to simplify data interactions.

### Folder Structure

- config: Contains configuration files for database connections and environment variables.

- controllers: Defines the logic for handling API requests and business operations.

- models: Contains Mongoose schemas for defining data structures.

- routes: Defines API endpoints and routes for handling client requests.

- services: Includes utility functions and services for token generation and verification.

### Key Features

- User Authentication: Handles user sign up, login, and token management.

- Project Management: Manages projects, project roles, and content creation.

- Middleware: Implements middleware functions for authentication and request processing.

### Database Interaction

The backend interacts with a MongoDB database to store and retrieve application data. It uses Mongoose schemas to define data structures and perform CRUD operations.
