
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import '../App.css';
import MentorCard from './MentorCard';
import SearchBar from './SearchBar';  // Import the updated SearchBar component
import Footer from './Footer';
import MentorInfo from './MentorInfo';

function HomePage() {
  const [mentors, setMentors] = useState([]); // State to hold mentor data
  const [searchQuery, setSearchQuery] = useState('');  // Search query state
  const [filters, setFilters] = useState({}); // Filters state (field, workplace)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true); // Show loading
      setError(null); // Reset error

      try {
        // Build the query string for the API call
        const query = new URLSearchParams({
          search: searchQuery || '',
          field: filters.field || '',
          workplace: filters.workplace || ''
        }).toString();

        const response = await axios.get(`/api/mentors?${query}`);
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        setError('Failed to fetch mentors. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMentors(); // Call the function to fetch mentors when search or filters change
  }, [searchQuery, filters]);

  return (
    <div className="App">
      <Header />
      <SearchBar setSearchQuery={setSearchQuery} setFilters={setFilters} />
      <div className="mentor-list">
        {loading ? (
          <p>Loading mentors...</p>
        ) : error ? (
          <p>{error}</p>
        ) : mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard 
              key={mentor.id}
              firstName={mentor.firstname}  
              lastName={mentor.lastname}
              avatar={mentor.avatar}
              field={mentor.field}
              workplace={mentor.workplace}
            />
          ))
        ) : (
          <p>No mentors found</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
