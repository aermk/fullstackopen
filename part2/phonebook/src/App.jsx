import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addNewName = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...person, number: newNumber };
        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p))
            )
          );
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: crypto.randomUUID(),
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }

    setNewName("");
    setNewNumber("");
  };

  const deleteName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person)
        .then((removedPerson) =>
          setPersons(persons.filter((p) => p.id !== removedPerson.id))
        )
        .catch((error) => {
          alert(`something went wrong`);
        });
    }
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

      <List
        list={filteredPersons}
        buttonLabel={"delete"}
        deleteName={deleteName}
      />
    </div>
  );
};

export default App;
