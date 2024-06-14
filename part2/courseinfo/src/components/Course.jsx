const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part} />)} 
    </div>
  )
}

const Total = ({ course }) => {
  return (
    <div>
   <strong><p> total of {course.parts.reduce((sum, part) => {
      sum += part.exercises
      return sum  
    }, 0)} exercises</p></strong>

    </div>
  )
}

const Course = ({course}) => {
  return (
  <>
    <Header course={course} />
    <Content course={course}/>
    <Total course={course} />
  </>
  )
}

export default Course
