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

        const response = await axios.get(`http://localhost:5000/api/mentors?${params}`);
        setMentors(response.data); // Set fetched mentors data
      } catch (error) {
        console.error(error.response || error.message || error);
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
      <div className="homepage-header">
        <img className="header-image" src="./queenb.png" alt="Mentor" />
        <div className="text-container">
          <h1 className="hero-text">Dream big, code bold</h1>
          <h2 className="hero-subtext">
            Our mentors are here to help you succeed
          </h2>
        </div>
      </div>

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
                avatar={
                  "https://img.freepik.com/free-vector/cute-girl-hacker-operating-laptop-cartoon-vector-icon-illustration-people-technology-isolated-flat_138676-9487.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid"
                }
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
