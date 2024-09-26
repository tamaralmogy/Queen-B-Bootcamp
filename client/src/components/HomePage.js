import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../App.css";
import MentorCard from "./MentorCard";
import SearchBar from "./SearchBar"; // Import the updated SearchBar component
import Footer from "./Footer";
import MentorProfile from "./MentorInfo";

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

  return (
    <div className="App">
      <Header />

      {/* Search bar to update the search query and filters */}
      <SearchBar setSearchQuery={setSearchQuery} setFilters={setFilters} />

      {selectedMentor && (
        <div className="mentor-details-container">
          <MentorProfile mentor={selectedMentor} />
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
                firstName={mentor.first_name}
                lastName={mentor.last_name}
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
