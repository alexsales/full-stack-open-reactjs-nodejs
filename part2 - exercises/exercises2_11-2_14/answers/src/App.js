import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Person from './components/Person';

import logo from './logo.svg';
import './App.css';

const App = () => {
  // persons
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [showAll, setShowAll] = useState(true);

  // countries
  const [countries, setCountries] = useState([]);

  // country search str and countriesFiltered
  const [cSearchStr, setCSearchStr] = useState('');
  const [cFiltered, setCFiltered] = useState([]);

  const handleCSearchStrChange = (event) => {
    console.log(event.target.value);
    setCSearchStr(event.target.value);
    event.target.value.length === 0
      ? setCFiltered(countries)
      : axios
          .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
          .then((resp) => {
            console.log('resp, cSearchStr: ', resp, cSearchStr);
            setCFiltered(resp.data);
          })
          .catch((error) => {
            console.log('error/no match');
            setCFiltered([]);
          });
  };

  const hookPersons = () => {
    console.log('axios get /persons');
    axios.get('http://localhost:3001/persons').then((resp) => {
      console.log('persons: ', resp);
      setPersons(resp.data);
    });
  };

  const hookCountries = () => {
    console.log('axios get countries');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((resp) => {
        console.log('countries: ', resp);
        setCountries(resp.data);
        setCFiltered(resp.data);
      })
      .catch(() => {
        console.log('error/no match');
        setCountries([]);
      });
  };

  const personsRender = persons.map((person) => {
    return (
      <li key={person.id}>
        {person.name}: {person.number}
      </li>
    );
  });

  const countriesRender = (() => {
    if (cFiltered.length > 10) {
      return [<li key={0}>'Please be more specific'</li>];
    } else if (cFiltered.length === 1) {
      return [
        <li key={cFiltered[0].alpha3Code}>
          <h2>{cFiltered[0].name}</h2>
          <div>Capital: {cFiltered[0].capital}</div>
          <div>Population: {cFiltered[0].population}</div>
          <div>
            Languages:
            <ul>
              {cFiltered[0].languages.map((lang) => (
                <li key={cFiltered[0].alpha3Code}>{lang.name}</li>
              ))}
            </ul>
          </div>
          <div>
            Flag:
            <span class='flag'>
              <img src={cFiltered[0].flag} width='200px' />
            </span>
          </div>
        </li>,
      ];
    } else if (cFiltered < 1) {
      return [<li key={0}>'No match found.'</li>];
    } else {
      return cFiltered.map((country) => {
        return <li key={country.alpha3Code}>{country.name}</li>;
      });
    }
  })();

  useEffect(hookPersons, []);
  useEffect(hookCountries, []);

  return (
    <div className='App'>
      <h2>Exercise 2.11</h2>
      <div>{personsRender}</div>

      <h2>Exercise 2.12</h2>
      <div>
        Search:{' '}
        <input
          value={cSearchStr}
          placeholder='Enter country'
          onChange={handleCSearchStrChange}
        />
      </div>
      <div>{countriesRender}</div>
    </div>
  );
};

export default App;
