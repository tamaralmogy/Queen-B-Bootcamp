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

  return (
    <div className="mentor-profile">
      <div className="mentor-details">
        <img
          src={mentor.avatar}
          alt={`${mentor.first_name} ${mentor.last_name}`}
        />
        <h2>
          {mentor.first_name} {mentor.last_name}
        </h2>
        <p>
          <strong>Field:</strong> {mentor.field}
        </p>
        <p>
          <strong>Workplace:</strong> {mentor.workplace}
        </p>

        <div className="mentor-contact">
          <button onClick={showPhone}>📞 Phone</button>
          <button onClick={showEmail}>📧 Email</button>
          <button onClick={showLinkedIn}>LinkedIn</button>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
