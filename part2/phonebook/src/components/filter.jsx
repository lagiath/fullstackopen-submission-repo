const Filter = (props) => {
  return (
    <div>filter: <input value={props.filter} onChange={props.handleFilter} /></div>
  )
}

export default Filter
