// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import '../App.css';
// import MentorCard from './MentorCard';
// import SearchBar from './SearchBar';  // Import the updated SearchBar component
// import Footer from './Footer';
// import MentorInfo from './MentorInfo';

// function HomePage() {
//   const [mentors, setMentors] = useState([]); // State to hold mentor data
//   const [searchQuery, setSearchQuery] = useState('');  // Search query state
//   const [filters, setFilters] = useState({}); // Filters state (field, workplace)
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     const fetchMentors = async () => {
//       setLoading(true); // Show loading
//       setError(null); // Reset error

//       try {
//         // Build the query string for the API call
//         const query = new URLSearchParams({
//           search: searchQuery || '',
//           field: filters.field || '',
//           workplace: filters.workplace || ''
//         }).toString();

//         const response = await axios.get(`/api/mentors?${query}`);
//         setMentors(response.data);
//       } catch (error) {
//         console.error('Error fetching mentors:', error);
//         setError('Failed to fetch mentors. Please try again.');
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchMentors(); // Call the function to fetch mentors when search or filters change
//   }, [searchQuery, filters]);

//   return (
//     <div className="App">
//       <Header />
//       <SearchBar setSearchQuery={setSearchQuery} setFilters={setFilters} />
//       <div className="mentor-list">
//         {loading ? (
//           <p>Loading mentors...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : mentors.length > 0 ? (
//           mentors.map((mentor) => (
//             <MentorCard
//               key={mentor.id}
//               firstName={mentor.firstname}
//               lastName={mentor.lastname}
//               avatar={mentor.avatar}
//               field={mentor.field}
//               workplace={mentor.workplace}
//             />
//           ))
//         ) : (
//           <p>No mentors found</p>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default HomePage;

//// worked one #################################################
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import '../App.css';
// import MentorCard from './MentorCard';
// import SearchBar from './SearchBar';
// import Footer from './Footer';
// import MentorProfile from './MentorInfo'; // Import the MentorProfile component

// function HomePage() {
//   const [mentors, setMentors] = useState([]);  // Mentor data from API
//   const [searchQuery, setSearchQuery] = useState('');  // Search state
//   const [selectedMentor, setSelectedMentor] = useState(null);  // Track selected mentor object
//   const [loading, setLoading] = useState(false);  // Loading state
//   const [error, setError] = useState(null);  // Error state

//   // Fetch mentors from the backend
//   useEffect(() => {
//     const fetchMentors = async () => {
//       setLoading(true);  // Set loading to true while fetching data
//       setError(null);  // Reset error state

//       try {
//         const query = searchQuery ? `?search=${searchQuery}` : '';
//         const response = await axios.get(`/api/mentors${query}`);
//         setMentors(response.data);  // Set fetched mentors data
//       } catch (error) {
//         setError('Failed to fetch mentors. Please try again.');
//       } finally {
//         setLoading(false);  // Stop loading after fetch attempt
//       }
//     };

//     fetchMentors();
//   }, [searchQuery]);  // Refetch data when the search query changes

//   // Handle selecting a mentor card
//   const handleMentorSelect = (mentor) => {
//     setSelectedMentor(mentor);  // Set the selected mentor object when clicked
//   };
//   return (
//     <div className="App">
//       <Header/>

//       {/* Search bar to update the search query */}
//       <SearchBar setSearchQuery={setSearchQuery} />

//       {selectedMentor && (
//           <div className="mentor-details-container">
//             <MentorProfile mentor={selectedMentor} />
//           </div>
//         )}

//       <div className="mentor-container">
//         <div className="mentor-list">
//           {loading ? (
//             <p>Loading mentors...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : mentors.length > 0 ? (
//             mentors.map((mentor) => (
//               <MentorCard
//                 key={mentor.id}
//                 firstName={mentor.firstname}
//                 lastName={mentor.lastname}
//                 avatar={mentor.avatar}
//                 field={mentor.field}
//                 workplace={mentor.workplace}
//                 onClick={() => handleMentorSelect(mentor)}  // Pass the entire mentor object on click
//               />
//             ))
//           ) : (
//             <p>No mentors found</p>
//           )}
//         </div>

//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../App.css";
import MentorCard from "./MentorCard";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import MentorProfile from "./MentorInfo"; // Import the MentorProfile component
import "./popup.css";

function HomePage() {
  const [mentors, setMentors] = useState([]); // Mentor data from API
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [filters, setFilters] = useState({ field: "", workplace: "" }); // Filters state
  const [selectedMentor, setSelectedMentor] = useState(null); // Track selected mentor object
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch mentors from the backend
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true); // Set loading to true while fetching data
      setError(null); // Reset error state

      try {
        // Build query string with search, field, and workplace filters
        const params = new URLSearchParams({
          search: searchQuery || "",
          field: filters.field || "",
          workplace: filters.workplace || "",
        }).toString();

        const response = await axios.get(`/api/mentors?${params}`);
        setMentors(response.data); // Set fetched mentors data
      } catch (error) {
        setError("Failed to fetch mentors. Please try again.");
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchMentors();
  }, [searchQuery, filters]); // Refetch data when the search query or filters change

  // Handle selecting a mentor card
  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor); // Set the selected mentor object when clicked
  };

  const closePopup = () => {
    setSelectedMentor(null); // Close the popup
  };

  return (
    <div className="App">
      <Header />

      {/* Search bar to update the search query and filters */}
      <SearchBar setSearchQuery={setSearchQuery} setFilters={setFilters} />

      {selectedMentor && (
        <div className="popup-overlay">
          <div className="popup-content">
            <MentorProfile mentor={selectedMentor} />
            <button className="close-popup" onClick={closePopup}>
              X
            </button>
          </div>
        </div>
      )}

      <div className="mentor-container">
        <div className="mentor-list">
          {loading ? (
            <p>Loading mentors...</p>
          ) : error ? (
            <p>{error}</p>
          ) : mentors.length > 0 ? (
            mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                fullname={mentor.fullname}
                avatar={mentor.avatar}
                field={mentor.field}
                workplace={mentor.workplace}
                onClick={() => handleMentorSelect(mentor)} // Pass the entire mentor object on click
              />
            ))
          ) : (
            <p>No mentors found</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
