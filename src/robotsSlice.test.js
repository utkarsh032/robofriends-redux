import { describe, expect, it } from 'vitest'
import { ROBOTS_URL } from './api/api'
import { fetchRobots, selectFilteredRobots, setSearchField } from './robotsSlice'
import { setupStore } from './store'
import { jsonResponse, mockRobots, stubFetch } from './testUtils'

describe('robots reducer', () => {
  it('starts empty and idle', () => {
    expect(setupStore().getState().robots).toEqual({
      robots: [],
      searchField: '',
      status: 'idle',
      error: null,
    })
  })

  it('handles setSearchField', () => {
    const store = setupStore()
    store.dispatch(setSearchField('abc'))
    expect(store.getState().robots.searchField).toBe('abc')
  })
})

describe('fetchRobots', () => {
  it('loads robots on success', async () => {
    const fetchMock = stubFetch(jsonResponse(mockRobots))
    const store = setupStore()

    const request = store.dispatch(fetchRobots())
    expect(store.getState().robots.status).toBe('loading')
    await request

    expect(fetchMock).toHaveBeenCalledWith(ROBOTS_URL)
    expect(store.getState().robots.status).toBe('succeeded')
    expect(store.getState().robots.robots).toEqual(mockRobots)
  })

  it('fails when the server returns an error status', async () => {
    stubFetch(jsonResponse({}, 500))
    const store = setupStore()

    await store.dispatch(fetchRobots())

    expect(store.getState().robots.status).toBe('failed')
    expect(store.getState().robots.error).toBe('Could not load robots (HTTP 500)')
  })

  it('fails when the network request fails', async () => {
    stubFetch(new TypeError('Failed to fetch'))
    const store = setupStore()

    await store.dispatch(fetchRobots())

    expect(store.getState().robots.status).toBe('failed')
    expect(store.getState().robots.error).toBe('Failed to fetch')
  })
})

describe('selectFilteredRobots', () => {
  const stateWith = (searchField) =>
    setupStore({ robots: { robots: mockRobots, searchField, status: 'succeeded', error: null } }).getState()

  it('filters by name, ignoring case and surrounding spaces', () => {
    expect(selectFilteredRobots(stateWith(' LEANNE '))).toEqual([mockRobots[0]])
  })

  it('returns everything for an empty search and nothing for no match', () => {
    expect(selectFilteredRobots(stateWith(''))).toEqual(mockRobots)
    expect(selectFilteredRobots(stateWith('Xavier'))).toEqual([])
  })
})
