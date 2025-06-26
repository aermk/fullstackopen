import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" && " %"}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, total, average, positive } = props;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(1)} />
        <StatisticLine text="positive" value={positive.toFixed(1)} />
      </tbody>
    </table>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = total ? (good * 1 + neutral * 0 + bad * -1) / total : 0;
  const positive = total ? (good / total) * 100 : 0;

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text={"give feedback"} />

      <Button text={"good"} handleClick={handleGoodClick} />
      <Button text={"neutral"} handleClick={handleNeutralClick} />
      <Button text={"bad"} handleClick={handleBadClick} />

      <Header text={"statistics"} />

      {total ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
