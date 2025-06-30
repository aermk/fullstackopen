import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <div>
      <ul>
        {parts.length &&
          parts.map((part) => <Part key={part.id} {...part}></Part>)}
      </ul>

      <Total total={total} />
    </div>
  );
};

export default Content;
