import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("response.data", response.data);
      setPersons(response.data);
    });
  }, []);

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
