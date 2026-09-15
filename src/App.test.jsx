import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import App from './App'
import { setupStore } from './store'
import { jsonResponse, mockRobots, stubFetch } from './testUtils'

const renderApp = () => {
  render(
    <Provider store={setupStore()}>
      <App />
    </Provider>,
  )
  return userEvent.setup()
}

describe('App', () => {
  it('shows loading, then a card for each robot', async () => {
    stubFetch(jsonResponse(mockRobots))
    renderApp()

    expect(screen.getByText('Loading robots…')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Leanne Graham' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByAltText('Robot avatar for Ervin Howell')).toHaveAttribute(
      'src',
      'https://robohash.org/2?size=200x200',
    )
  })

  it('filters robots as you type', async () => {
    stubFetch(jsonResponse(mockRobots))
    const user = renderApp()
    await screen.findByRole('heading', { name: 'Leanne Graham' })

    await user.type(screen.getByRole('searchbox', { name: 'Search robots' }), 'ervin')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Ervin Howell' })).toBeInTheDocument()

    await user.type(screen.getByRole('searchbox'), 'zzz')
    expect(screen.getByText('No robots match “ervinzzz”.')).toBeInTheDocument()
  })

  it('shows an error and recovers when retrying', async () => {
    stubFetch(new TypeError('Failed to fetch'), jsonResponse(mockRobots))
    const user = renderApp()

    expect(await screen.findByRole('alert')).toHaveTextContent('Failed to fetch')

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByRole('heading', { name: 'Leanne Graham' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
