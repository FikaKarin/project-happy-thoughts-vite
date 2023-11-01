import React, { useState, useEffect } from 'react';
import './style.css';
import Error from '../Error.jsx'; // Import the ErrorMessage component

// Define the ThoughtForm component
export default function ThoughtForm({ onFormSubmit }) {
  // State variables for managing the new thought, error message, and submission status
  const [newThought, setNewThought] = useState(''); // State to store the new thought input
  const [error, setError] = useState(''); // State to store error message
  const [submitted, setSubmitted] = useState(false); // State to track whether a thought has been submitted

  // useEffect hook to handle the submitted state and reset it after animation duration
  useEffect(() => {
    if (submitted) {
      // Reset submitted state after the animation duration (0.5s in this case)
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 500);

      // Clear the timer if the component unmounts or if a new submission occurs
      return () => {
        clearTimeout(timer);
      };
    }
  }, [submitted]); // Re-run effect when the submitted state changes

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate if the new thought is not empty
    if (newThought.trim() === '') {
      setError('Thought cannot be empty'); // Set error message if thought is empty
      return;
    }
    onFormSubmit(newThought); // Call the onFormSubmit function passed from props with the new thought
    setNewThought(''); // Clear the input field after submission
    setSubmitted(true); // Set submitted to true when the form is submitted for animation
  };

  // Function to handle input change and update the new thought state
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setNewThought(inputText); // Update the new thought state with the input text
  };

  // Render the component
  return (
    <div className={`form-container ${submitted ? 'bounce-in' : ''}`}>
      {/* Form element with input field, character count, and submit button */}
      <form onSubmit={handleSubmit}>
        <label>What's making you happy right now?</label>
        <input
          type='text'
          value={newThought}
          onChange={handleInputChange}
          maxLength={140}
          placeholder="'If music be the food of love, play on.' - William Shapespear"
        />
        {/* Display character count and limit it to 140 */}
        <div className='character-count'>{newThought.length}/140</div>
        {/* Submit button with heart symbols */}
        <button className='send' type='submit'>
          <span>❤️</span> Send Happy Thoughts <span>❤️</span>
        </button>
      </form>
      {/* Use ErrorMessage component to display error message */}
      <Error error={error} setError={setError} />
    </div>
  );
}
