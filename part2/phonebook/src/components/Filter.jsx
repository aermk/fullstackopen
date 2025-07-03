const Filter = ({ filterValue, handleFilterChange, text }) => {
  return (
    <div>
      {text} <input value={filterValue} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
