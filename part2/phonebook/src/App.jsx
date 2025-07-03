import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNewName = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        text={"filter shown with: "}
        filterValue={filter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add new</h3>

      <Form
        newNameValue={newName}
        newNumberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewName={addNewName}
      />
      <h3>Numbers</h3>

      <List list={filteredPersons} />
    </div>
  );
};

export default App;
