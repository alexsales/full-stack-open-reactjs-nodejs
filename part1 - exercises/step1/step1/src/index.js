import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course.name}</h1>;

const Part = (props) => (
  <p>
    {props.val.part} {props.val.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.course.parts.map((val, indx) => {
      return <Part key={indx} val={val} />;
    })}
  </>
);

const Total = (props) => {
  let totalExercises = props.course.parts.reduce((acc, val) => {
    return acc + val.exercises;
  }, 0);

  return <p>Number of exercises {totalExercises > 0 ? totalExercises : 0}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        part: 'Fundamentals of React',
        exercises: 10,
      },
      {
        part: 'Using props to pass data',
        exercises: 7,
      },
      {
        part: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
