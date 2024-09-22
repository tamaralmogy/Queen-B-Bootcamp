import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firstPerson from './images/person1.svg';
import Header from './components/Header';
import './App.css';
import MentorCard from './components/MentorCard';
const port = process.env.PORT || 5001;

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:${port}/api/helloworld`)
      .then(response => setMessage(response.data))
      .catch(error => console.error(`There was an error retrieving the message: ${error}`))
  }, [])

  return (
    <div className="App">
      <Header/>
      
      {/* add here upcoming events*/}

      <input 
          type="text" 
          placeholder="Search by name or skill"
          className="search-bar"
        />

      <div className="mentor-list">
        {/* must pass on the database records and add as needed */}
        <MentorCard name="Haya" />
        <MentorCard name="Haya2" />
        <MentorCard name="Haya3" />
      </div>

      <h1>{message}</h1>
      <img src={firstPerson} alt="person1" />
    </div>
  );
}

export default App;