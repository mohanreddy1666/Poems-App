import React from 'react';
import '../styles/Styles.css';

export default function Header() {
  return (
    <div className='main'>
      <header className='main-header'>
        <h2 className='header'>Poems</h2>
      </header>
      <div className='button-poem'>
        <button
          className='fetch-poem-button'
          type='button'
          onClick={() => (window.location.href = '/home')}
        >
          Fetch Poems
        </button>
      </div>
    </div>
  );
}
