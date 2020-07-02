import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Persons/Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';
//import Radium, {StyleRoot} from 'radium';

const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
      color: black;
    }
`;

const App = (props) => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: '1', name: 'Radu', age: 23 },
      { id: '2', name: 'Costel', age: 22 },
      { id: '3', name: 'Ovidiu', age: 26 }
    ]
  });

  const [otherState, setOtherState] = useState('some other value');
  const [showPersonsState, setShowPersonsState] = useState(false);

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
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
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

    // style.backgroundColor = 'red';
    // style[':hover'] = {
    //   backgroundColor: 'salmon',
    //   color: 'black'
    // };
  }

  const classes = [];
  if (personsState.persons.length <= 2) {
    classes.push('red');
  }
  if (personsState.persons.length <= 1) {
    classes.push('bold');
  }

  const [userInputState, setUserInputState] = useState({
    userInput: ''
  });

  const inputChangeHandler = (event) => {
    setUserInputState({userInput: event.target.value });
  }

  let assignmentUserInput = (
    <div>
      <input 
        type="text"
        onChange={inputChangeHandler}
        value={userInputState.userInput} />
       <p>Input length: {userInputState.userInput.length}</p>
    </div>
  );

  const deleteCharHandler = (index) => {
    const text = userInputState.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    setUserInputState({userInput: updatedText});
  };

  const charList = userInputState.userInput.split('').map((char, index) => {
    return <Char 
      character={char} 
      key={index}
      clicked={() => deleteCharHandler(index)} />;
  });


  return (
    //</StyleRoot><StyleRoot>
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p className={classes.join(' ')}>This is really working!</p>

      {/* style={style} */}
      <StyledButton
        onClick={togglePersonsHandler}
        alt={showPersonsState}>
        Toggle Persons
      </StyledButton>  
      {persons}

      {assignmentUserInput}
      <Validation inputLength={userInputState.userInput.length}/>
      {charList}
    </div>
  );
}

export default App;
