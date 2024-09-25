CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE mentors (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES "User" (id) ON DELETE CASCADE,  
    avatar VARCHAR(255),
    field VARCHAR(100),
    phone VARCHAR(20),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    languages VARCHAR(255),
    workplace VARCHAR(255),
    linkToSchedule VARCHAR(255)
);
