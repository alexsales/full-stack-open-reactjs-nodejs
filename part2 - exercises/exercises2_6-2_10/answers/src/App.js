import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    console.log('button clicked', event.targt);

    event.preventDefault();
    const nameObject = {
      name: newName,
    };

    console.log(persons);
    setPersons(persons.concat(nameObject));
    setNewName('');
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
