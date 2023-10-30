import React, { useState, useEffect } from 'react';
import './style.css';
import Error from '../Error.jsx'; // Import the ErrorMessage component

export default function ThoughtForm({ onFormSubmit }) {
  const [newThought, setNewThought] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to track whether a thought has been submitted

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
  }, [submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newThought.trim() === '') {
      setError('Thought cannot be empty');
      return;
    }
    onFormSubmit(newThought);
    setNewThought('');
    setSubmitted(true); // Set submitted to true when the form is submitted
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setNewThought(inputText);
  };

  return (
    <div className={`form-container ${submitted ? 'bounce-in' : ''}`}>
      <form onSubmit={handleSubmit}>
        <label>What's making you happy right now?</label>
        <input
          type='text'
          value={newThought}
          onChange={handleInputChange}
          maxLength={140}
          placeholder='It´s a bad day, not a bad life...'
        />
        <div className='character-count'>{newThought.length}/140</div>
        <button className='send' type='submit'>
          ❤️ Send Happy Thought ❤️
        </button>
      </form>
      {/* Use ErrorMessage component to display error */}
      <Error error={error} setError={setError} />
    </div>
  );
}
