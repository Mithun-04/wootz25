Event Organizer Backend
This is the backend for the Event Organizer application, which allows users to register, log in, create, and manage events. The backend is built using Node.js, Express, and MongoDB. It supports user authentication with JWT (JSON Web Tokens), event management, and basic user profile functionality.

Features
User Authentication: Register, login, and authenticate users using JWT tokens.
Event Management: Create, read, update, and delete events.
User Profiles: View and update user profile information.
Table of Contents
Installation
Environment Variables
Routes
Project Structure
Technologies Used
License
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/event-organizer-backend.git
Navigate to the project directory:

bash
Copy
Edit
cd event-organizer-backend
Install dependencies:

bash
Copy
Edit
npm install
Set up your environment variables. Create a .env file in the root directory with the following content:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
Replace your_mongo_connection_string with your MongoDB connection string.
Replace your_jwt_secret_key with a secure key used for JWT token generation.
Start the server:

bash
Copy
Edit
npm start
The server will now be running at http://localhost:5000.

Environment Variables
PORT: Port where the server will run (default: 5000).
MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key used for signing JWT tokens.
Routes
Authentication Routes
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in and obtain a JWT token.
Event Routes
POST /api/events - Create a new event (Protected route).
GET /api/events - Get all events.
GET /api/events/:id - Get a specific event by ID.
DELETE /api/events/:id - Delete an event (Protected route).
User Routes
GET /api/user/profile - Get user profile information (Protected route).
PUT /api/user/profile - Update user profile information (Protected route).
Note: Routes with the term "Protected route" require a valid JWT token in the Authorization header in the format Bearer <token>.

Project Structure
bash
Copy
Edit
/event-organizer-backend
│── server.js                # Entry point of the server
│── .env                     # Environment variables
│── package.json             # Node.js dependencies
│── package-lock.json        # Lock file for package versions
│── config/
│   ├── db.js                # Database connection setup
│── models/
│   ├── User.js              # User model schema
│   ├── Event.js             # Event model schema
│── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── eventRoutes.js       # Event-related routes
│   ├── userRoutes.js        # User-related routes
│── controllers/
│   ├── authController.js    # Authentication logic
│   ├── eventController.js   # Event handling logic
│   ├── userController.js    # User handling logic
│── middleware/
│   ├── authMiddleware.js    # Middleware for authentication (JWT)
│── utils/
│   ├── helpers.js           # Utility functions (if needed)
└── README.md                # Documentation
Description of Key Files:
server.js: The entry point of the application, where the Express server is set up.
config/db.js: Handles the database connection using Mongoose to MongoDB.
models/: Contains the MongoDB schemas for User and Event.
routes/: Defines all the routes for authentication, event management, and user-related functionality.
controllers/: Contains the logic for each route (e.g., registering users, creating events, etc.).
middleware/: Contains middleware like the authentication middleware to protect certain routes.
utils/helpers.js: Includes utility functions for sanitizing input, formatting dates, generating unique IDs, and validating emails.
Technologies Used
Node.js: JavaScript runtime for building the backend.
Express: Web framework for handling HTTP requests.
MongoDB: NoSQL database for storing data.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
JWT: JSON Web Tokens for secure authentication.
bcryptjs: For hashing and comparing passwords.
moment.js (Optional): For handling and formatting dates.
uuid: For generating unique identifiers.
License
This project is licensed under the MIT License - see the LICENSE file for details.