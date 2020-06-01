import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6));
  const [votes, setVotes] = useState({});
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

  console.log(selected, votes);

  return (
    <>
      <div className='App'>
        <div>{anecdotes[selected]}</div>
        <button onClick={() => updateVotes(selected)}>Vote</button>
        <button onClick={newQuote}>Generate Random Quote</button>
      </div>
    </>
  );
};

export default App;
