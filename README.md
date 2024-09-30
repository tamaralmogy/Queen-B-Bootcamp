# Mentor-Mentee Fullstack App

## Overview
This is a fullstack web application designed to connect mentors and mentees. The application features user authentication, mentor search, and individual mentor pages. The client side is built using **React**, while the server side uses **Express**. The database is powered by **PostgreSQL**, and we use **pgAdmin** for database management.

## Features
- **User Authentication**: Sign-up and login functionality for mentors and mentees.
- **Mentor Search**: Mentees can browse and search for mentors based on their skills.
- **Mentor Profiles**: Individual pages showcasing each mentor’s profile.
- **Real-time Updates**: Mentors can update their availability and mentees can schedule sessions.
  
## Technologies
- **Frontend**: React
- **Backend**: Express.js
- **Database**: PostgreSQL with pgAdmin
- **Authentication**: bcrypt (removed in a later version)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- PostgreSQL and pgAdmin

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
  ```
2. Install dependencies:
- For the server:
```bash
cd server
npm install
```
- For the client:
```bash
cd client
npm install
```

## Set up the PostgreSQL database:

1. Create a new database in pgAdmin.
2. Update the database connection configuration in the server's environment file (`.env`).

## Start the development server:

- Start the backend (server):
  ```bash
  npm start
  ```
- Start the frontend (client):
  ```bash
  cd client
  npm start
  ```
## Usage
Once the servers are running, you can access the application in your browser:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)


