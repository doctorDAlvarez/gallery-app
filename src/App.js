import React from 'react';
import './index.css';
import Nav from './Nav';
import apiKey from './config';
import SearchForm from './SearchForm';
import PhotoContainer from './PhotoContainer';

console.log(apiKey);

// fetch("")
//   .then()
//   .catch()


  function App() {
  return (
    <div className='container'>
      <SearchForm />
      <Nav />
      <PhotoContainer />
    </div>
  );
}

export default App;
