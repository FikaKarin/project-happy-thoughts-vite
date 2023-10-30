import React, { useState, useEffect } from 'react';
import ThoughtForm from './components/ThoughtsForm/ThoughtsForm';
import ThoughtList from './components/ThoughtList/ThoughtList';
import Header from './components/Header/Header';
import './components/ThoughtsForm/style.css';

const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';

export default function App() {
  const [thoughts, setThoughts] = useState([]);
  const [likedThoughts, setLikedThoughts] = useState(new Set()); // Use Set to store liked thought IDs
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          const thoughtsWithTimestamp = data.map((thought) => ({
            ...thought,
            timestamp: new Date(thought.createdAt).toISOString(),
          }));
          setThoughts(thoughtsWithTimestamp);
        })
        .catch((error) => {
          console.error('Error fetching thoughts:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }, []);

  const handleFormSubmit = (message) => {
    // Send POST request to add a new thought
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
        // Update likedThoughts Set with the ID of the new thought
        setLikedThoughts(new Set(likedThoughts.add(newThought._id)));
      })
      .catch((error) => {
        console.error('Error posting thought:', error);
      });
  };

  const handleLike = (thoughtId) => {
    // Send POST request to like a thought
    fetch(`${API_URL}/${thoughtId}/like`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((updatedThought) => {
        const updatedThoughts = thoughts.map((thought) =>
          thought._id === updatedThought._id
            ? { ...thought, hearts: updatedThought.hearts }
            : thought
        );
        setThoughts(updatedThoughts);
        // Update likedThoughts Set with the ID of the liked thought
        setLikedThoughts(new Set(likedThoughts.add(updatedThought._id)));
      })
      .catch((error) => {
        console.error('Error liking thought:', error);
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
          <ThoughtList
            thoughts={thoughts}
            onLike={handleLike}
            likedThoughts={likedThoughts}
          />
        </div>
      )}
    </>
  );
}
