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

const StatisticLine = ({text, value, children}) => {
  return (
    <>
    <td>{text}</td> 
    <td>{value} {children}</td>
    </>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
   <table>
    <tbody>
    <tr><StatisticLine text='good' value={props.good} /></tr>
    <tr><StatisticLine text='neutral' value={props.neutral} /></tr>
    <tr><StatisticLine text='bad' value={props.bad} /></tr>
    <tr><StatisticLine text='all' value={props.total} /></tr>
    <tr><StatisticLine text='average' value={props.avg} /></tr>
    <tr><StatisticLine text='positive' value={props.pos}>%</StatisticLine></tr>
    </tbody>
   </table>
  ) 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)
  const head = ['give feedback', 'statistics']

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + bad + neutral
    setGood(updatedGood)
    setTotal(updatedTotal)
    const avgSum = (updatedGood - bad) / updatedTotal
    setAvg(avgSum)
    const updatedPos = (updatedGood / updatedTotal) * 100
    setPos(updatedPos)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + bad + updatedNeutral
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    const avgSum = (good - bad) / updatedTotal 
    setAvg(avgSum)
    const updatedPos = (good / updatedTotal) * 100
    setPos(updatedPos)

  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + updatedBad + neutral
    setBad(updatedBad)
    setTotal(updatedTotal)
    const avgSum = (good - updatedBad) / updatedTotal
    setAvg(avgSum)
    const updatedPos = (good / updatedTotal) * 100
    setPos(updatedPos)
  }

  return (
    <div>
    <Header head={head[0]} />
    <Button onClick={handleGoodClick} text='good' />
    <Button onClick={handleNeutralClick} text='neutral' />
    <Button onClick={handleBadClick} text='bad' />
    <Header head={head[1]} />
    <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} pos={pos} />
    </div>
  )
}

export default App
