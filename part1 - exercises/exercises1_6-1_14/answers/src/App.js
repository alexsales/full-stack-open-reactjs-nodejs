import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [moreStats, setMoreStats] = useState({
    totalResponses: 0,
    avgFeedback: 0,
    percentPositive: 0,
  });

  const updateStats = () => {
    console.log('stats updated', good, neutral, bad);
    let numOfFeedback = null;
    let feedbackAvg = null;
    let positivePercentage = null;

    numOfFeedback = good + neutral + bad;
    feedbackAvg = (good * 1 + neutral * 0 + bad * -1) / numOfFeedback;
    positivePercentage = good / numOfFeedback;

    setMoreStats({
      ...moreStats,
      totalResponses: numOfFeedback,
      avgFeedback: !!feedbackAvg ? feedbackAvg : 'N/A',
      percentPositive: !!positivePercentage ? positivePercentage : 'N/A',
    });
  };

  const clickHandler = (evt, feedback) => {
    if (feedback === 'good') {
      setGood(good + 1);
      return updateStats(good + 1, neutral, bad);
    }
    if (feedback === 'neutral') {
      setNeutral(neutral + 1);
      return updateStats(good, neutral + 1, bad);
    }
    if (feedback === 'bad') {
      setBad(bad + 1);
      return updateStats(good, neutral, bad + 1);
    }
  };

  useEffect(() => {
    updateStats();
  }, [good, neutral, bad]);

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
          <li>good: {good}</li>
          <li>neutral: {neutral}</li>
          <li>bad: {bad}</li>
          <li>all: {moreStats.totalResponses}</li>
          <li>avg feedback: {moreStats.avgFeedback}</li>
          <li>percent positive: {moreStats.percentPositive}</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
