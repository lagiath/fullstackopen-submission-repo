import { useState } from 'react'


const Header = (props) => {
 return (
   <div>
    <h1>{props.head}</h1>
   </div>
 ) 
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
    {props.text}
    </button>
  )
}

const Anecdote = (props) => {
  return (
    <p>{props.anecdotes[props.selected]}<br />
    has {props.votes[props.selected]} votes
    </p>
  )
}

const MaxAnecdote = (props) => {
  return (
    <p>{props.anecdotes[props.getMax(props.votes)]}<br />
    has {props.votes[props.getMax(props.votes)]}
    </p>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const head = ['Anecdote of the day', 'Anecdote with most votes']

  const setRandom = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const handleVotes = () => {
     const newVotes = [...votes]
     newVotes[selected] += 1
     setVotes(newVotes)
    }

  const getMax = (arr) => {
  return arr.reduce((iMax, el, i, arr) => (el > arr[iMax] ? i : iMax), 0);
};

  return (
    <div>
      <Header head={head[0]} />
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
      <Button onClick={handleVotes} text='vote' />
      <Button onClick={setRandom} text='next anecdote'/>
      <Header head={head[1]} />
      <MaxAnecdote anecdotes={anecdotes} getMax={getMax} votes={votes} />
   </div>
  )
}

export default App
