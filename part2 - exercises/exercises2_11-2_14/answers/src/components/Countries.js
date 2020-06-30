import React from 'react';

const Countries = (props) => {
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
                <li key={props.cFiltered[0].alpha3Code}>{lang.name}</li>
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
        return <li key={country.alpha3Code}>{country.name}</li>;
      });
    }
  })();
  return <div>{countriesRender}</div>;
};

export default Countries;
