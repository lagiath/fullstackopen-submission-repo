import { useState, useEffect } from 'react'
import Person from './components/person.jsx'
import Form from './components/form.jsx'
import Filter from './components/filter.jsx'
import axios from 'axios'
import personService from './services/persons.js'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccess] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const addDetails = (event) => {
  event.preventDefault();
  const nameObj = {
    name: newName,
    number: newNum,
  };

  const person = persons.find(person => person.name === newName)
  const numberExists = persons.some(person => person.number === newNum)

  if (person && !numberExists) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...person, number: newNum }
      personService.update(person.id, updatedPerson).then(returnedPerson => {
        setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)))
        setSuccess(`Updated ${newName}'s number`)
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
        setNewName('')
        setNewNum('')
      })
      .catch(error => {
          setErrorMessage(
          `Information of '${newName}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }
  } else if (!person) {
    personService.create(nameObj).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setSuccess(`Added ${newName}`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000);
      setNewName('')
      setNewNum('')
    }).catch(error => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  } else {
    alert(`${newName} is already added to phonebook`)
  }
};
  

  const deleteDetails = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
       personService.deletePerson(id).then(() => {
       setPersons(persons.filter(p => p.id !== id))
    })
      .catch(error => {
        alert('Failed to delete person')
      })
    }

   
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const filterNames = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  
  return (
    <div>
      <h2>Phonebook</h2>
    {successMessage !== null ? <Notification message={successMessage} /> : null }
    {errorMessage !== null ? <Error message={errorMessage} /> : null}
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add new</h2>
      <Form addDetails={addDetails} newName={newName} newNum={newNum} handleNumChange={handleNumChange} handleNameChange={handleNameChange} />
    <h2>Numbers</h2>
        {filterNames.map((person) => <Person key={person.id} person={person} deletePerson={deleteDetails} />)}      
    </div>
  )
}

export default App
