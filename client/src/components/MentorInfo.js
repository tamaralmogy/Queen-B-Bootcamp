import React from "react";
import "./MentorInfo.css";

function MentorProfile({ mentor }) {
  const showPhone = () => {
    alert(`Phone: ${mentor.phone}`);
  };

  const showEmail = () => {
    alert(`Email: ${mentor.email}`);
  };

  const showLinkedIn = () => {
    window.open(mentor.linkedin, "_blank");
  };

  const showGitHub = () => {
    window.open(mentor.github, "_blank"); // Open the GitHub link in a new tab
  };

  const showSchedule = () => {
    window.open(mentor.schedulelink, "_blank"); // Open the schedule link in a new tab
  };

  return (
    <div className="mentor-profile">
      <div className="mentor-details">
        <img
          src="https://img.freepik.com/free-vector/cute-girl-hacker-operating-laptop-cartoon-vector-icon-illustration-people-technology-isolated-flat_138676-9487.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid"
          alt={`${mentor.fullname}`}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
          }}
        />
        <h2>{mentor.fullname}</h2>
        <p>
          <strong>Field:</strong> {mentor.field}
        </p>
        <p>
          <strong>Workplace:</strong> {mentor.workplace}
        </p>
        <p>
          <strong>Languages:</strong> {mentor.programminglanguages}
        </p>

        <div className="mentor-contact">
          <button onClick={showPhone}>📞 Phone</button>
          <button onClick={showEmail}>📧 Email</button>
          <button onClick={showLinkedIn}>LinkedIn</button>
          <button onClick={showGitHub}>GitHub</button>
          <button onClick={showSchedule}>🗓️ Schedule</button>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
