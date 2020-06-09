import React from 'react';
import ReactDOM from 'react-dom';
import Courses from './components/Courses';
import './index.css';

const App = () => {
  return <Courses />;
};

ReactDOM.render(<App />, document.getElementById('root'));
