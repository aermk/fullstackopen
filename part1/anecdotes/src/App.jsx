import { useState } from "react";
const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Display = ({ anecdote, votes }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const anecdotesAmount = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const bestAnecdoteIndex = votes.indexOf(Math.max(...votes));

  const handleNextClick = () => {
    const num = Math.floor(Math.random() * anecdotesAmount);

    setSelected(num);
  };

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Display
        anecdote={anecdotes[bestAnecdoteIndex]}
        votes={votes[bestAnecdoteIndex]}
      />
    </>
  );
};

export default App;
