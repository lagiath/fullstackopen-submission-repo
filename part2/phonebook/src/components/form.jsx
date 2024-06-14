const Form = (props) => {
  return (
    <form onSubmit={props.addDetails}>
      <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>number: <input value={props.newNum} onChange={props.handleNumChange} /></div>
    <div><button type="submit">add</button></div>
    </form>

  )
}

export default Form
