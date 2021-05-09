import React from 'react';
import './index.css';
import Photo from './Photo';
import Nav from './Nav';
import apiKey from './config';

function App() {
  return (
    <div className='container'>
      {/* FORM */}
      <Nav />
      <Photo />
    </div>
  );
}

export default App;
