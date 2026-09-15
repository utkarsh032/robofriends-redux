export default function Card({ id, name, email }) {
  return (
    <article className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img
        alt={`Robot avatar for ${name}`}
        src={`https://robohash.org/${id}?size=200x200`}
        width='200'
        height='200'
        loading='lazy'
      />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </article>
  )
}
