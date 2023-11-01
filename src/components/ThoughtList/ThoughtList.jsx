import React from 'react';
import './style.css';

// Function to calculate the time difference between the current time and a given timestamp
const calculateTimeDifference = (timestamp) => {
  const postedTime = Date.parse(timestamp); // Parse the timestamp string to create a Date object
  const now = new Date();
  const timeDifference = Math.floor((now - postedTime) / 1000); // Calculate time difference in seconds

  const minutes = Math.floor(timeDifference / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`; // Return minutes ago if less than an hour
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`; // Return hours ago if less than a day
  } else return `less than a minute ago`; // Return less than a minute ago for other cases
};

// Define the ThoughtList component
export default function ThoughtList({ thoughts, onLike, likedThoughts }) {
  // Convert the likedThoughts Set to an array to trigger re-renders
  const likedThoughtsArray = Array.from(likedThoughts);

  // Function to handle the like button click event
  const handleLikeClick = (thoughtId) => {
    // Call the onLike function passed from props with thoughtId and isLiked set to true
    onLike(thoughtId, true);
  };

  // Render the component
  return (
    <div className='list-container'>
      {/* Display the count of liked thoughts */}
      <div className='liked-thoughts-count'>
        Liked Thoughts: {likedThoughtsArray.length}
      </div>
      {/* Map through thoughts array and render each thought */}
      <div className='thought-list'>
        {thoughts.map((thought) => (
          <div key={thought._id} className='thought'>
            <p>{thought.message}</p>
            {/* Render like button with appropriate CSS class based on whether the thought is liked */}
            <div className='heart-text'>
              <button
                onClick={() => handleLikeClick(thought._id)}
                className={
                  likedThoughtsArray.includes(thought._id) ? 'pink-heart' : ''
                }
              >
                ❤️
              </button>
              {/* Display the number of hearts (likes) for the thought */}
              <p>X {thought.hearts}</p>{' '}
              {/* Display the formatted timestamp using calculateTimeDifference function */}
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
