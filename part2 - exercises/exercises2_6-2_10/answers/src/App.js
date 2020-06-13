import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const checkDuplicateName = (nameObj) =>
    persons.findIndex(
      (item) => item.name.toLowerCase() === nameObj.name.toLowerCase()
    );
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };

    if (checkDuplicateName(nameObject) === -1) {
      setPersons(persons.concat(nameObject));
      setNewName('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
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
