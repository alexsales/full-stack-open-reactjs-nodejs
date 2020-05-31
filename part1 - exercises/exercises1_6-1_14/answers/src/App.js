import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>

      {props.moreStats.totalResponses === 0 ? (
        <p>No feedback given</p>
      ) : (
        <ul>
          <li>good: {props.good}</li>
          <li>neutral: {props.neutral}</li>
          <li>bad: {props.bad}</li>
          <li>all: {props.moreStats.totalResponses}</li>
          <li>avg feedback: {props.moreStats.avgFeedback}</li>
          <li>percent positive: {props.moreStats.percentPositive}</li>
        </ul>
      )}
    </div>
  );
};

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

  const clickHandler = (evt, feedback) => {
    if (feedback === 'good') {
      setGood(good + 1);
    }
    if (feedback === 'neutral') {
      setNeutral(neutral + 1);
    }
    if (feedback === 'bad') {
      setBad(bad + 1);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log('stats updated', good, neutral, bad);
    let numOfFeedback = null;
    let feedbackAvg = null;
    let positivePercentage = null;

    numOfFeedback = good + neutral + bad;
    feedbackAvg = (good * 1 + neutral * 0 + bad * -1) / numOfFeedback;
    positivePercentage = good / numOfFeedback;

    setMoreStats({
      totalResponses: numOfFeedback,
      avgFeedback: !!feedbackAvg ? feedbackAvg : 'N/A',
      percentPositive: !!positivePercentage ? positivePercentage : 'N/A',
    });
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        moreStats={moreStats}
      />
    </div>
  );
};

export default App;
