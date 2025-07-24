import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import List from "./components/List";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

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
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p))
            );
            showNotification(`${returnedPerson.name} was updated`);
          })
          .catch((error) => {
            showNotification(
              `${updatedPerson} has already been removed from server`
            );
            setError(true);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: crypto.randomUUID(),
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showNotification(`${returnedPerson.name} was added`);
        })
        .catch((error) => {
          showNotification(`Something went wrong`);
          setError(true);
        });
    }

    setNewName("");
    setNewNumber("");
    setError(false);
  };

  const deleteName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person)
        .then((removedPerson) => {
          setPersons(persons.filter((p) => p.id !== removedPerson.id));
          showNotification(`${removedPerson.name} was removed`);
        })
        .catch((error) => {
          showNotification(`something went wrong`);
          setError(true);
        });
    }
    setError(false);
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
      {notificationMessage && (
        <Notification isItError={error} message={notificationMessage} />
      )}

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
