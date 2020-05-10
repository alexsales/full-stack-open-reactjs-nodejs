import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.val.part} {props.val.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.content.map((val, indx) => {
      return <Part key={indx} val={val} />;
    })}
  </>
);

const Total = (props) => {
  let totalExercises = props.content.reduce((acc, val) => {
    return acc + val.exercises;
  }, 0);

  return <p>Number of exercises {totalExercises > 0 ? totalExercises : 0}</p>;
};

const App = () => {
  const course = 'Half Stack application development';

  const content = [
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
  ];

  // const part1 = 'Fundamentals of React';
  // const exercises1 = 10;
  // const part2 = 'Using props to pass data';
  // const exercises2 = 7;
  // const part3 = 'State of a component';
  // const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />

      {/* <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
