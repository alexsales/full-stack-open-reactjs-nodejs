import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Person';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((resp) => {
      console.log('promise fulfilled');
      setPersons(resp.data);
    });
  };

  useEffect(hook, []);

  console.log('render', persons.length, 'persons');

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
