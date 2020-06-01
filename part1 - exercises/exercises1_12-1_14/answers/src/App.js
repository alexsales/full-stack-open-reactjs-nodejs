import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6));
  const [votes, setVotes] = useState({});
  const [selectedMax, setSelectedMax] = useState();
  const isFirstRender = useRef(true);

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const newQuote = () => {
    setSelected(Math.floor(Math.random() * 6));
  };

  const updateVotes = (selectedQuote) => {
    const incrementedVote = !!votes[selectedQuote]
      ? votes[selectedQuote] + 1
      : 1;

    setVotes({
      ...votes,
      [selectedQuote]: incrementedVote,
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (votes[selectedMax] === null || votes[selectedMax] === undefined) {
      selected === 0 ? setSelectedMax('zero') : setSelectedMax(selected);
    } else {
      const max = votes[selected] > votes[selectedMax] ? selected : selectedMax;
      max === 0 ? setSelectedMax('zero') : setSelectedMax(max);
    }
  }, [votes, selectedMax, selected]);

  console.log(votes);
  return (
    <div className='App'>
      <div className='anecdoteContainer'>
        <h2>Anecdote of the day</h2>
        <div className='anecdote'>{anecdotes[selected]}</div>
        <button onClick={() => updateVotes(selected)}>Vote</button>
        <button onClick={newQuote}>Generate Random Quote</button>
      </div>

      {selectedMax ? (
        <div>
          <h2>Anecdote with most votes</h2>
          <div className='anecdote'>
            {selectedMax === 'zero' ? anecdotes[0] : anecdotes[selectedMax]}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
