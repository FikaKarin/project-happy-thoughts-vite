import React, { useState, useEffect } from 'react';
import ThoughtForm from './components/ThoughtsForm/ThoughtsForm';
import ThoughtList from './components/ThoughtList/ThoughtList';
import Header from './components/Header/Header';
import './components/ThoughtsForm/style.css';
import './components/ThoughtList/style.css'

// Define the API endpoint URL
const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';

export default function App() {
  // State variables for managing thoughts, liked thoughts, and loading status
  const [thoughts, setThoughts] = useState([]); // Array to store thoughts
  const [likedThoughts, setLikedThoughts] = useState(new Set()); // Set to store liked thought IDs
  const [loading, setLoading] = useState(true); // Loading status indicator

  // useEffect hook to fetch thoughts from the API when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading status to true while fetching data
    setTimeout(() => {
      // Simulate loading delay with setTimeout for 2 seconds
      fetch(API_URL)
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          // Map the fetched data and add timestamp to each thought
          const thoughtsWithTimestamp = data.map((thought) => ({
            ...thought,
            timestamp: new Date(thought.createdAt).toISOString(),
          }));
          // Update thoughts state with fetched thoughts
          setThoughts(thoughtsWithTimestamp);
        })
        .catch((error) => {
          console.error('Error fetching thoughts:', error); // Log any errors that occur during fetching
        })
        .finally(() => {
          setLoading(false); // Set loading status to false after fetching data (whether successful or not)
        });
    }, 2000); // Wait for 2 seconds before fetching data (simulating loading time) - only for showing teacher this part of assignment.
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleFormSubmit = (message) => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to post thought');
      })
      .then((newThought) => {
        setThoughts([newThought, ...thoughts]);
        // Do NOT add the new thought's ID to likedThoughts here.
      })
      .catch((error) => {
        console.error('Error posting thought:', error);
      });
  };

  // Function to handle liking a thought
  const handleLike = (thoughtId) => {
    fetch(`${API_URL}/${thoughtId}/like`, {
      method: 'POST', // Send a POST request to like a thought
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((updatedThought) => {
        // Map through thoughts and update the one with the matching ID with new heart count
        const updatedThoughts = thoughts.map((thought) =>
          thought._id === updatedThought._id
            ? { ...thought, hearts: updatedThought.hearts }
            : thought
        );
        // Update thoughts state with updated thoughts
        setThoughts(updatedThoughts);
        // Update likedThoughts Set with the ID of the liked thought
        setLikedThoughts(new Set(likedThoughts.add(updatedThought._id)));
      })
      .catch((error) => {
        console.error('Error liking thought:', error); // Log any errors that occur during liking
      });
  };

  return (
    <>
      {loading ? (
        <div className='loading'>
          <div>Loading...</div>
          <div className='spinner' />
        </div>
      ) : (
        <div className='container'>
          <Header />
          <ThoughtForm onFormSubmit={handleFormSubmit} />
          <div className='list-container'>
            <ThoughtList
              thoughts={thoughts}
              onLike={handleLike}
              likedThoughts={likedThoughts}
            />
          </div>
        </div>
      )}
    </>
  );
}
