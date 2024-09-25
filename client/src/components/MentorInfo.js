import React from 'react';
import './MentorInfo.css'; 


// database
function getMentorById(id) {
  const mentorsData = [
    {
      id: 1,
      firstName: 'Mia',
      lastName: 'Cohen',
      field: 'Software Development',
      job: 'Exponentia',
      programmingLanguages: ['JavaScript', 'Python'],
      email: 'mia@example.com',
      phone: '050-1234567',
      linkedin: 'https://www.linkedin.com/in/mia',
      calendly: 'https://calendly.com/mia',
    },
    // Add more mentors??
  ];

  return mentorsData.find((mentor) => mentor.id === id);
}

const MentorProfile = ({ id }) => {
  const mentor = getMentorById(id);

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  // showinfo
  const showPhone = () => {
    alert(`Phone: ${mentor.phone}`);
  };

  const showEmail = () => {
    alert(`Email: ${mentor.email}`);
  };

  const showLinkedIn = () => {
    window.open(mentor.linkedin, '_blank');
  };

  return (
    <div className="mentor-profile">
      <h1 className="mentor-name">
        {mentor.firstName} {mentor.lastName}
      </h1>
      <p className="mentor-languages">
        Programming Languages: {mentor.programmingLanguages.join(', ')}
      </p>
      <p className="mentor-job">Works at: {mentor.job}</p>

      <div className="mentor-contact">
        <button onClick={showPhone}>📞 Phone</button>
        <button onClick={showEmail}>📧 Email</button>
        <button onClick={showLinkedIn}>LinkedIn</button>
      </div>
    </div>
  );
};

export default MentorProfile;