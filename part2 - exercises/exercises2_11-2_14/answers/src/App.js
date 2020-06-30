import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Countries from './components/Countries';
import Search from './components/Search';

// import logo from './logo.svg';
import './App.css';

const App = () => {
  // persons
  const [persons, setPersons] = useState([]);

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

  useEffect(hookPersons, []);
  useEffect(hookCountries, []);

  return (
    <div className='App'>
      <h2>Exercise 2.11</h2>
      <div>
        <Persons persons={persons} />
      </div>

      <h2>Exercise 2.12</h2>
      <Search
        cSearchStr={cSearchStr}
        handleCSearchStrChange={handleCSearchStrChange}
      />
      <div>
        <Countries cFiltered={cFiltered} />
      </div>
    </div>
  );
};

export default App;
