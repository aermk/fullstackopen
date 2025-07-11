const List = ({ list, deleteName, buttonLabel }) => {
  return (
    <ul>
      {list.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteName(person)}>{buttonLabel}</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
