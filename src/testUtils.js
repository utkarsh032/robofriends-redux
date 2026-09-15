import { vi } from 'vitest'

export const mockRobots = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
]

export const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), { status })

// Replaces global fetch; each call resolves (or rejects) with the next queued result.
export const stubFetch = (...results) => {
  const fetchMock = vi.fn()
  for (const result of results) {
    if (result instanceof Error) fetchMock.mockRejectedValueOnce(result)
    else fetchMock.mockResolvedValueOnce(result)
  }
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}
