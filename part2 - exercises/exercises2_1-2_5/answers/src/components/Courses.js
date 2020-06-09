import React from 'react';

const Header = (props) => <h1>{props.course.name}</h1>;

const Part = (props) => (
  <p>
    {props.val.name} {props.val.exercises}
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

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Courses = () => {
  const courseList = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courseList.map((val, indx) => (
        <Course key={val.id} course={val} />
      ))}
    </>
  );
};

export default Courses;
