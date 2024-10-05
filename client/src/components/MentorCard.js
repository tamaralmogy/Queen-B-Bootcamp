
import "../App.css";
import React from "react";

function MentorCard({ fullname, avatar, field, workplace, onClick }) {
  return (
    <div className="mentor-card" onClick={onClick}>
      <img src={avatar} alt={`${fullname}`} style={{ width: "100%" }} />
      <h3>{fullname}</h3>
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
