import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const checkDuplicateName = (name) =>
    persons.findIndex((item) => item.name.toLowerCase() === name.toLowerCase());

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (checkDuplicateName(nameObject.name) === -1) {
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
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
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
