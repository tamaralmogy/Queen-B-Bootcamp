

import React from 'react';
import '../App.css';

const MentorCard = ({ firstName, lastName, avatar, field, languages }) => {
  return (
    <div className="mentor-card">
      <img src={avatar} alt={firstName} className="avatar" />
      <h2>{firstName} {lastName}</h2>
      <p><strong>Field:</strong> {field}</p>
      <p><strong>Languages:</strong> {languages}</p>
    </div>
  );
};

export default MentorCard;
