import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CardList from './components/CardList'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import SearchBox from './components/SearchBox'
import { fetchRobots, selectFilteredRobots, setSearchField } from './robotsSlice'

export default function App() {
  const dispatch = useDispatch()
  const { searchField, status, error } = useSelector((state) => state.robots)
  const filteredRobots = useSelector(selectFilteredRobots)

  useEffect(() => {
    dispatch(fetchRobots())
  }, [dispatch])

  let content
  if (status === 'failed') {
    content = (
      <div role='alert'>
        <p className='f4 white'>{error}</p>
        <button className='pa2 ph3 br2 ba b--green bg-lightest-blue pointer' onClick={() => dispatch(fetchRobots())}>
          Try again
        </button>
      </div>
    )
  } else if (status !== 'succeeded') {
    content = <p className='f3 white' role='status'>Loading robots…</p>
  } else if (filteredRobots.length === 0) {
    content = <p className='f4 white'>No robots match “{searchField}”.</p>
  } else {
    content = <CardList robots={filteredRobots} />
  }

  return (
    <div className='tc ph3 pb4'>
      <Header />
      <SearchBox value={searchField} onSearchChange={(event) => dispatch(setSearchField(event.target.value))} />
      <main>
        <ErrorBoundary>{content}</ErrorBoundary>
      </main>
    </div>
  )
}
