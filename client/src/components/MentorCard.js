import React from "react";
import "../App.css";

function MentorCard({
  firstName,
  lastName,
  avatar,
  field,
  workplace,
  onClick,
}) {
  return (
    <div className="mentor-card" onClick={onClick}>
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        style={{ width: "100%" }}
      />
      <h3>
        {firstName} {lastName}
      </h3>
      <p>
        <strong>Field:</strong> {field}
      </p>
      <p>
        <strong>Workplace:</strong> {workplace}
      </p>
    </div>
  );
}

export default MentorCard;
