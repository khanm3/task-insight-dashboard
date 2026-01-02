import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  test('renders task dashboard', () => {
    render(<App />)
    expect(screen.getByText(/task insight dashboard/i)).toBeInTheDocument()
  })

  describe('task fetching', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Test Task A' },
          { id: 2, title: 'Test Task B' },
        ]
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    test('renders fetched tasks', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByText('Test Task A')).toBeInTheDocument()
        expect(screen.getByText('Test Task B')).toBeInTheDocument()
      })
    })
  })
})
