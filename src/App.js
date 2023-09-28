import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import service from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([]) 

  //fetches data from server
  useEffect(() => {service
    .getAll()
    .then(initialList => {
        setPersons(initialList)
      })
  }, [])

  //Adds new person (name and number) to the phonebook
  const addPerson = (event) => {
    event.preventDefault()
    const newPersons = {name: newName, number: newNumber}
    //find if entered name equals to existed name - caseInsensitive
    if (persons.some((element) => element.name.toLowerCase() === newName.toLowerCase() )){
      //if new name exists, set window confirm
      if (window.confirm( `${ newPersons.name } is already added to phonebook, replace the old number with a new one?`)){
        //create new array for useState hook  
        const alteredPersons = persons.map( (person) => {
            if (newPersons.name.toLowerCase() === person.name.toLowerCase()) {
              //update (return) existed name's name and number - caseInsensitive
              return {...person, name: newPersons.name, number: newPersons.number}
            } else { return person } 
          })
          setPersons(alteredPersons)
          //find updated name's (Object's) id for PUT method
          const id = persons.filter((person) => {return newPersons.name.toLowerCase() === person.name.toLowerCase()})[0].id;
          service
            .updatePerson(newPersons, id)
            .catch(error => {
              setMessage(
                `Information of ${newPersons.name} has already been removed from server`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== id))
            })
    }
    //Add new name if entered name not equals to existed name
    }else{service
      .create(newPersons)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })}
      setNewName('')
      setNewNumber('')
      //Confirmation message after adding person to the phonebook
      setMessage(
        `Added ${newPersons.name} `
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
  }

  const [message, setMessage] = useState(null)

    //Deletes person (name and number) from the phonebook
    const deletePerson = (event, id) => {
      event.preventDefault()
      const deletedPerson = persons.filter((person) => {return person.id !== id})
      setPersons(deletedPerson)
      service
        .deletePerson(id)
      }

  const [newName, setNewName] = useState('')

  // Takes new name's value from the form
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const [newNumber, setNewNumber] = useState('')

  // Takes new name's value from the form
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const [newSearch, setNewSearch] = useState('')  

  //Takes value from searchbar and sets showAll's state to false 
  const handleSearch = (event) => {
    setNewSearch(event.target.value.toLowerCase());
    if (newSearch !== ''){return setShowAll(false)}
  }

  const [showAll, setShowAll] = useState(true)

  //Show only persons from searchbar
  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newSearch));

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter value={newSearch} onChange={handleSearch}/>


      <h2>add a new </h2>
      <PersonForm newName={newName} 
                  handleNameChange={handleNameChange} 
                  newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} 
                  addPerson={addPerson} 
                  />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App