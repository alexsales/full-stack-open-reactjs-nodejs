import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const Statistics = (props) => (
  <li>
    {props.text}: {props.value}
  </li>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [moreStats, setMoreStats] = useState({
    totalResponses: 0,
    avgFeedback: 0,
    percentPositive: 0,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log('stats updated', good, neutral, bad);

    let numOfFeedback = good + neutral + bad;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setMoreStats({
      totalResponses: numOfFeedback,
      avgFeedback: (good * 1 + neutral * 0 + bad * -1) / numOfFeedback,
      percentPositive: good / numOfFeedback,
    });
  }, [good, neutral, bad]);

  return (
    <div className='App'>
      <div>
        <h2>Give Feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>

      <div>
        <h2>Statistics</h2>
        {moreStats.totalResponses === 0 ? (
          <p>No feedback given</p>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>
                  <Statistics text='good' value={good} />
                </td>
              </tr>
              <tr>
                <td>
                  <Statistics text='neutral' value={neutral} />
                </td>
              </tr>
              <tr>
                <td>
                  <Statistics text='bad' value={bad} />
                </td>
              </tr>
              <tr>
                <td>
                  <Statistics text='all' value={moreStats.totalResponses} />
                </td>
              </tr>
              <tr>
                <td>
                  <Statistics
                    text='avg feedback'
                    value={moreStats.avgFeedback}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Statistics
                    text='percent positive'
                    value={moreStats.percentPositive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
