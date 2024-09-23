// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import firstPerson from './images/person1.svg';
// import Header from './components/Header';
// import './App.css';
// import MentorCard from './components/MentorCard';
// const port = process.env.PORT || 5001;

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get(`http://localhost:${port}/api/helloworld`)
//       .then(response => setMessage(response.data))
//       .catch(error => console.error(`There was an error retrieving the message: ${error}`))
//   }, [])

//   return (
//     <div className="App">
//       <Header/>

//       {/* add here upcoming events*/}

//       <input 
//           type="text" 
//           placeholder="Search by name or skill"
//           className="search-bar"
//         />

//       <div className="mentor-list">
//         {/* must pass on the database records and add as needed */}
//         <MentorCard name="Haya" />
//         <MentorCard name="Haya222222" />
//         <MentorCard name="Haya3" />
//       </div>

//       <h1>{message}</h1>
//       <img src={firstPerson} alt="person1" />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firstPerson from './images/person1.svg';
import Header from './components/Header';
import './App.css';
import MentorCard from './components/MentorCard';

const port = process.env.PORT || 5001;

function App() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Fetch mentors from the API
    axios.get('/api/mentors')  // This makes the actual request to your backend API
      .then(response => setMentors(response.data))  // This updates the mentors state with the fetched data
      .catch(error => console.error(`There was an error retrieving the mentors: ${error}`));
  }, []);

  return (
    <div className="App">
      <Header />

      <input 
          type="text" 
          placeholder="Search by name or skill"
          className="search-bar"
      />

      <div className="mentor-list">
        <MentorCard firstName="haya" />
        <MentorCard firstName="tamar" />
        <MentorCard firstName="afek" />
        <MentorCard firstName="gabrialla" />

        {mentors.map((mentor) => (
          <MentorCard 
            key={mentor.id}
            firstName={mentor.firstname}  
            lastName={mentor.lastname}
            avatar={mentor.avatar}
            field={mentor.field}
            languages={mentor.languages}
          />
        ))}

      </div>

      <img src={firstPerson} alt="person1" />
    </div>
  );
}

export default App;
