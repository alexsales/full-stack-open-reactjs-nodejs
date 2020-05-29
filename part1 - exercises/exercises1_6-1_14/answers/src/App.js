import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickHandler = (evt, feedback) => {
    if (feedback === 'good') {
      return setGood(good + 1);
    }
    if (feedback === 'neutral') {
      return setNeutral(neutral + 1);
    }
    if (feedback === 'bad') {
      return setBad(bad + 1);
    }
  };

  return (
    <div className='App'>
      <div>
        <h2>Give Feedback</h2>
        <button onClick={(event) => clickHandler(event, 'good')}>good</button>
        <button onClick={(event) => clickHandler(event, 'neutral')}>
          neutral
        </button>
        <button onClick={(event) => clickHandler(event, 'bad')}>bad</button>
      </div>

      <div>
        <h2>Statistics</h2>
        <ul>
          <li>good {good}</li>
          <li>neutral {neutral}</li>
          <li>bad {bad}</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
