import React from 'react';
import { useState } from 'react';
import './style.css';

const calculateTimeDifference = (timestamp) => {
  const postedTime = Date.parse(timestamp); // Parse the timestamp string to create a Date object
  const now = new Date();
  const timeDifference = Math.floor((now - postedTime) / 1000); // Calculate time difference in seconds

  const minutes = Math.floor(timeDifference / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else return `less than a minute ago`;
};

export default function ThoughtList({ thoughts, onLike, likedThoughts }) {

    // Convert the likedThoughts Set to an array to trigger re-renders
    const likedThoughtsArray = Array.from(likedThoughts);

  const handleLikeClick = (thoughtId) => {
    // Call the onLike function passed from props with isLiked set to true
    onLike(thoughtId, true);
  };

  return (
    <div className='list-container'>
        <div className='liked-thoughts-count'>
        Liked Thoughts: {likedThoughtsArray.length}
      </div>
      <div className='thought-list'>
        {thoughts.map((thought) => (
          <div key={thought._id} className='thought'>
            <p>{thought.message}</p>
            <div className='heart-text'>
              <button
                onClick={() => handleLikeClick(thought._id)}
                className={likedThoughtsArray.includes(thought._id) ? 'pink-heart' : ''}
              >
                ❤️
              </button>
              <p>X {thought.hearts}</p>{' '}
              <p className='timestamp'>
                {calculateTimeDifference(thought.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}