import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = (props) => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: '1', name: 'Radu', age: 23 },
      { id: '2', name: 'Costel', age: 22 },
      { id: '3', name: 'Ovidiu', age: 26 }
    ]
  });

  const [otherState, setOtherState] = useState('some other value');
  const [showPersonsState, setShowPersonsState] = useState(true);

  console.log(personsState, otherState);

  const switchNameHandler = (newName) => {
    console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Radu-Cristian';
    setPersonsState({
      persons: [
        { name: newName, age: 23 },
        { name: 'Costel', age: 22 },
        { name: 'Ovidiu', age: 27 }
      ]
    });
  };

  const nameChangedHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex(p => {
      return p.id === id;
    });

    //const person = Object.assign({}, personsState.persons[personIndex]);

    const person = {
      ...personsState.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    setPersonsState({
      persons: persons
    });
  };

  const deletePersonHandler = (personIndex) => {
    //const persons = personsState.persons.slice();
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);
    setPersonsState({
      persons: persons
    });
  };

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  const togglePersonsHandler = () => {
    setShowPersonsState(prevValue => !prevValue);
  }

  let persons = null;
  if (showPersonsState) {
    persons = (
      <div>
        {personsState.persons.map((person, index) => {
          return <Person
            click={() => deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => nameChangedHandler(event, person.id)} />
        })}
        {/* <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age} />
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={switchNameHandler.bind(this, 'Radu!!!')}
          changed={nameChangedHandler}>
          My hobbies: Deleting databases</Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age} /> */}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button
        style={style}
        onClick={togglePersonsHandler}>Toggle Persons</button>
      {persons}
    </div>
  );
}

export default App;
