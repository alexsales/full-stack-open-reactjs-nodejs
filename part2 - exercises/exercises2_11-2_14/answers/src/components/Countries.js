import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = (props) => {
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedWeather, setSelectedWeather] = useState({});

  const handleShow = (evt, country) => {
    // console.log('handle show: ', evt.target.getAttribute('id'));
    evt.preventDefault();
    setSelectedCountry(country);
  };

  const countriesRender = (() => {
    if (props.cFiltered.length > 10) {
      return [<li key={0}>'Please be more specific'</li>];
    } else if (props.cFiltered.length === 1) {
      return [
        <li key={props.cFiltered[0].alpha3Code}>
          <h2>{props.cFiltered[0].name}</h2>
          <div>Capital: {props.cFiltered[0].capital}</div>
          <div>Population: {props.cFiltered[0].population}</div>
          <div>
            Languages:{' '}
            <ul>
              {props.cFiltered[0].languages.map((lang) => (
                <li key={lang.iso639_1}>{lang.name}</li>
              ))}
            </ul>
          </div>
          <div>
            Flag:{' '}
            <span className='flag'>
              <img
                src={props.cFiltered[0].flag}
                width='200px'
                alt='country flag'
              />
            </span>
          </div>
        </li>,
      ];
    } else if (props.cFiltered < 1) {
      return [<li key={0}>'No match found.'</li>];
    } else {
      return props.cFiltered.map((country) => {
        return (
          <li key={country.alpha3Code}>
            {country.name}{' '}
            <input
              id={country.alpha3Code}
              type='button'
              value='show'
              onClick={(evt) => handleShow(evt, country)}
            />
            {!!selectedCountry &&
            !!selectedCountry.name &&
            selectedCountry.name === country.name ? (
              <div>
                <h2>{selectedCountry.name}</h2>
                <div>Capital: {selectedCountry.capital}</div>
                <div>Population: {selectedCountry.population}</div>
                <div>
                  Languages:{' '}
                  <ul>
                    {selectedCountry.languages !== undefined
                      ? selectedCountry.languages.map((lang) => (
                          <li key={lang.iso639_1}>{lang.name}</li>
                        ))
                      : null}
                  </ul>
                </div>
                <div>
                  Flag:{' '}
                  <span className='flag'>
                    <img
                      src={selectedCountry.flag}
                      width='200px'
                      alt='country flag'
                    />
                  </span>
                </div>
              </div>
            ) : (
              ''
            )}
            {!!selectedCountry &&
            !!selectedCountry.name &&
            selectedCountry.capital === country.capital &&
            !!selectedWeather.current ? (
              <div>
                <h2>Weather in {selectedCountry.capital}</h2>
                <div>
                  Temperature: {selectedWeather.current.temperature} Celcius
                </div>
                <div>
                  <span className='flag'>
                    <img
                      src={selectedWeather.current.weather_icons[0]}
                      width='200px'
                      alt='country weather'
                    />
                  </span>
                </div>
                <div>
                  Wind: {selectedWeather.current.wind_speed} mph direction{' '}
                  {selectedWeather.current.wind_dir}
                </div>
              </div>
            ) : (
              ''
            )}
          </li>
        );
      });
    }
  })();

  const hookWeather = () => {
    console.log('chosen country changed');
    // console.log(selectedCountry);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=${selectedCountry.capital}`
      )
      .then((resp) => {
        setSelectedWeather(resp.data);
      })
      .catch((error) => {
        console.log('error/no match');
        setSelectedCountry({});
      });
  };

  useEffect(hookWeather, [selectedCountry]);

  return (
    <>
      <div>{countriesRender}</div>
    </>
  );
};

export default Countries;
