import React, { useState } from 'react';
import './style.css';

export default function ThoughtForm({ onFormSubmit }) {
  const [newThought, setNewThought] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(newThought);
    setNewThought('');
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label>What's making you happy right now?</label>
        <input
          type='text'
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder='It´s a bad day, not a bad life...'
        />
        <button className='send' type='submit'> ❤️ Send Happy Thought ❤️ </button>
      </form>
    </div>
  );
}
