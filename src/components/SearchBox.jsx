export default function SearchBox({ value, onSearchChange }) {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search robots'
        aria-label='Search robots'
        value={value}
        onChange={onSearchChange}
      />
    </div>
  )
}
