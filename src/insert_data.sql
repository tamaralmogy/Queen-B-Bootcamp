-- Insert into the User table
INSERT INTO "users" (firstName, lastName, email, password, role) VALUES 
('John', 'Doe', 'john.doe@example.com', 'password123', 'mentor'),
('Jane', 'Smith', 'jane.smith@example.com', 'securepassword', 'mentor'),
('Emily', 'Johnson', 'emily.johnson@example.com', 'passw0rd', 'mentor'),
('Michael', 'Brown', 'michael.brown@example.com', 'password456', 'mentor'),
('Sarah', 'Davis', 'sarah.davis@example.com', 'password789', 'mentor'),
('James', 'Wilson', 'james.wilson@example.com', 'password111', 'mentor'),
('Linda', 'Garcia', 'linda.garcia@example.com', 'password222', 'mentor'),
('David', 'Martinez', 'david.martinez@example.com', 'password333', 'mentor'),
('Karen', 'Rodriguez', 'karen.rodriguez@example.com', 'password444', 'mentor'),
('Daniel', 'Miller', 'daniel.miller@example.com', 'password555', 'mentor');

-- Insert into the Mentor table
INSERT INTO "mentors" (userId, avatar, field, phone, linkedin, github, languages, workplace, linkToSchedule) VALUES 
(1, 'https://example.com/avatars/john_doe.jpg', 'Software Engineering', '123-456-7890', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe', 'English, Spanish', 'Tech Corp', 'https://calendly.com/johndoe'),
(2, 'https://example.com/avatars/jane_smith.jpg', 'Data Science', '234-567-8901', 'https://linkedin.com/in/janesmith', 'https://github.com/janesmith', 'English, French', 'DataX', 'https://calendly.com/janesmith'),
(3, 'https://example.com/avatars/emily_johnson.jpg', 'Product Management', '345-678-9012', 'https://linkedin.com/in/emilyjohnson', 'https://github.com/emilyjohnson', 'English', 'Innovate Labs', 'https://calendly.com/emilyjohnson'),
(4, 'https://example.com/avatars/michael_brown.jpg', 'Cybersecurity', '456-789-0123', 'https://linkedin.com/in/michaelbrown', 'https://github.com/michaelbrown', 'English, German', 'CyberSafe', 'https://calendly.com/michaelbrown'),
(5, 'https://example.com/avatars/sarah_davis.jpg', 'AI Research', '567-890-1234', 'https://linkedin.com/in/sarahdavis', 'https://github.com/sarahdavis', 'English, Chinese', 'AI Labs', 'https://calendly.com/sarahdavis'),
(6, 'https://example.com/avatars/james_wilson.jpg', 'Web Development', '678-901-2345', 'https://linkedin.com/in/jameswilson', 'https://github.com/jameswilson', 'English', 'WebTech', 'https://calendly.com/jameswilson'),
(7, 'https://example.com/avatars/linda_garcia.jpg', 'Machine Learning', '789-012-3456', 'https://linkedin.com/in/lindagarcia', 'https://github.com/lindagarcia', 'English, Spanish', 'ML Solutions', 'https://calendly.com/lindagarcia'),
(8, 'https://example.com/avatars/david_martinez.jpg', 'Blockchain Development', '890-123-4567', 'https://linkedin.com/in/davidmartinez', 'https://github.com/davidmartinez', 'English, Portuguese', 'CryptoTech', 'https://calendly.com/davidmartinez'),
(9, 'https://example.com/avatars/karen_rodriguez.jpg', 'DevOps Engineering', '901-234-5678', 'https://linkedin.com/in/karenrodriguez', 'https://github.com/karenrodriguez', 'English, Italian', 'DevOps Pro', 'https://calendly.com/karenrodriguez'),
(10, 'https://example.com/avatars/daniel_miller.jpg', 'Cloud Engineering', '012-345-6789', 'https://linkedin.com/in/danielmiller', 'https://github.com/danielmiller', 'English', 'CloudTech', 'https://calendly.com/danielmiller');

