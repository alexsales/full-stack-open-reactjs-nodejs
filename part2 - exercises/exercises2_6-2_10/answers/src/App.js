import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const Filter = (props) => (
  <form onSubmit={props.filterPersons}>
    <div>
      filter shown with{' '}
      <input value={props.searchStr} onChange={props.handleSearchStrChange} />
    </div>
  </form>
);

const PersonForm = (props) => (
  <form onSubmit={props.addName}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number:{' '}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

const Persons = (props) => (
  <div>
    <ul>
      {props.displayedPersons.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        );
      })}
    </ul>
  </div>
);

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
      <Filter
        filterPersons={filterPersons}
        searchStr={searchStr}
        handleSearchStrChange={handleSearchStrChange}
      />
      <h2>Add New</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons displayedPersons={displayedPersons} />
    </div>
  );
};

export default App;
