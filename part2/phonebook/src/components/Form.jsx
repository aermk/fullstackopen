const Form = ({
  newNameValue,
  newNumberValue,
  handleNameChange,
  handleNumberChange,
  addNewName,
}) => {
  return (
    <form>
      <div>
        name: <input value={newNameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumberValue} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit" onClick={addNewName}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
