
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import firstPerson from './images/person1.svg';
// import Header from './components/Header';
// import './App.css';
// import MentorCard from './components/MentorCard';
// import SearchBar from './components/SearchBar';

// const port = process.env.PORT || 5001;

// function App() {
//   const [mentors, setMentors] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // useEffect(() => {
//   //   axios.get('/api/mentors')
//   //     .then(response => setMentors(response.data))  
//   //     .catch(error => console.error(`There was an error retrieving the mentors: ${error}`));
//   // }, []);


//   useEffect(() => {
//     const fetchMentors = () => {
//       const query = searchQuery ? `?search=${searchQuery}` : '';
//       axios.get(`/api/mentors${query}`)
//         .then(response => setMentors(response.data))  
//         .catch(error => console.error(`There was an error retrieving the mentors: ${error}`));
//     };
  
//     fetchMentors();
//   }, [searchQuery]);  // Refetch the mentors whenever the searchQuery changes


//   const filteredMentors = mentors.filter((mentor) => {
//     const fullName = `${mentor.firstName} ${mentor.lastName}`.toLowerCase();
//     const query = searchQuery.toLowerCase();

//     return (
//       fullName.includes(query) || 
//       mentor.field.toLowerCase().includes(query) || 
//       mentor.languages.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <div className="App">
//       <Header />

//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

//       <div className="mentor-list">
//         {/* <MentorCard firstName="haya" />
//         <MentorCard firstName="tamar" />
//         <MentorCard firstName="afek" />
//         <MentorCard firstName="gabrialla" /> */}

//         {mentors.map((mentor) => (
//           <MentorCard 
//             key={mentor.id}
//             firstName={mentor.firstname}  
//             lastName={mentor.lastname}
//             avatar={mentor.avatar}
//             field={mentor.field}
//             languages={mentor.languages}
//           />
//         ))}

//       </div>

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
import SearchBar from './components/SearchBar';  // Import the SearchBar component
import Footer from './components/Footer';

function App() {
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // Search query state

  useEffect(() => {
    // Fetch mentors from the API, including the search query if it's not empty
    const fetchMentors = () => {
      const query = searchQuery ? `?search=${searchQuery}` : '';
      axios.get(`/api/mentors${query}`)
        .then(response => setMentors(response.data))  
        .catch(error => console.error(`There was an error retrieving the mentors: ${error}`));
    };

    fetchMentors();
  }, [searchQuery]);  // Refetch the mentors whenever the searchQuery changes

  return (
    <div className="App">
      <Header />

      {/* Pass the setSearchQuery function to SearchBar */}
      <SearchBar setSearchQuery={setSearchQuery} />

      <div className="mentor-list">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard 
              key={mentor.id}
              firstName={mentor.firstname}  
              lastName={mentor.lastname}
              avatar={mentor.avatar}
              field={mentor.field}
              languages={mentor.languages}
            />
          ))
        ) : (
          <p>No mentors found</p>  // Show if no mentors match the query
        )}
      </div>

      <Footer/>
    </div>
  );
}

export default App;
