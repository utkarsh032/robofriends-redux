import Card from './Card'

export default function CardList({ robots }) {
  return (
    <div>
      {robots.map((robot) => (
        <Card key={robot.id} id={robot.id} name={robot.name} email={robot.email} />
      ))}
    </div>
  )
}
