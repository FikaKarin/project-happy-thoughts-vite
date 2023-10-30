import React, { useState, useEffect } from 'react';
import ThoughtForm from './components/ThoughtsForm/ThoughtsForm';
import ThoughtList from './components/ThoughtList/ThoughtList';
import Header from './components/Header/Header';

const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';

export default function App() {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    // Fetch recent thoughts from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Add a timestamp property to each thought in the API response
        const thoughtsWithTimestamp = data.map((thought) => ({
          ...thought,
          timestamp: new Date(thought.createdAt).toISOString(), // assuming createdAt is the property from API response
        }));
        setThoughts(thoughtsWithTimestamp);
      });
  }, []); // Empty dependency array ensures this effect runs once after the first render


  const handleFormSubmit = (message) => {
    // Send POST request to add a new thought
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((newThought) => {
        // Add the new thought to the thoughts array
        setThoughts([newThought, ...thoughts]);
      });
  };

  const handleLike = (thoughtId) => {
    // Send POST request to like a thought
    fetch(`${API_URL}/${thoughtId}/like`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((updatedThought) => {
        // Update the hearts property of the liked thought
        const updatedThoughts = thoughts.map((thought) =>
          thought._id === updatedThought._id ? { ...thought, hearts: updatedThought.hearts } : thought
        );
        
        // Update the thoughts array with the liked thought
        setThoughts(updatedThoughts);
      });
  };  

  return (
    <div className='container'>
      <Header />
      {/* Form to post new thoughts */}
      <ThoughtForm onFormSubmit={handleFormSubmit} />

      {/* List of thoughts */}
      <ThoughtList thoughts={thoughts} onLike={handleLike} />
    </div>
  );
}
