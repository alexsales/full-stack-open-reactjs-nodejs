import React from 'react';

const Persons = (props) => {
  const personsRender = props.persons.map((person) => {
    return (
      <li key={person.id}>
        {person.name}: {person.number}
      </li>
    );
  });
  return <div>{personsRender}</div>;
};

export default Persons;
