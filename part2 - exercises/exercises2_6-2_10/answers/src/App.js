import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'John Doe', number: 123 },
  ]);
  const [displayedPersons, setDisplayedPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

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
      setDisplayedPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const filterPersons = (event) => {
    event.preventDefault();

    if (searchStr.length === 0) {
      setDisplayedPersons(persons);
      return false;
    }

    const indx = persons.findIndex((val, indx) => {
      const tmpValSplit = val.name.split(' ');
      const tmpIndx = tmpValSplit.findIndex((tmpVal, tmpIndx) => {
        return tmpVal.toLowerCase() === searchStr.toLowerCase();
      });

      return tmpIndx === -1 ? false : true;
    });

    indx === -1
      ? setDisplayedPersons([].concat({ name: 'No Match' }))
      : setDisplayedPersons([].concat(persons[indx]));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchStrChange = (event) => {
    setSearchStr(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={filterPersons}>
        <div>
          filter shown with{' '}
          <input value={searchStr} onChange={handleSearchStrChange} />
        </div>
      </form>
      <h2>Add New</h2>
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
          {displayedPersons.map((person) => {
            return (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
