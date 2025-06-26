const Part = (props) => {
  console.log(props, "Part");
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.parts.length &&
        props.parts.map((part, index) => <Part key={index} {...part}></Part>)}
    </div>
  );
};

const Total = (props) => {
  let total = 0;

  props.parts.forEach((part) => {
    total += part.exercises;
  });
  console.log(total);

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
