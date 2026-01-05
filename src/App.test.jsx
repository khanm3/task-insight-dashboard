import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  describe('task filtering', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Test Task A', completed: false },
          { id: 2, title: 'Test Task B', completed: false },
          { id: 3, title: 'Test Task C', completed: true },

        ]
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    test('shows only incomplete tasks when the incomplete filter is selected', async () => {
      render(<App />)

      const button = await screen.findByRole('button', { name: /incomplete/i }) // Let component load
      
      const user = userEvent.setup()
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('Test Task A')).toBeInTheDocument()
        expect(screen.getByText('Test Task B')).toBeInTheDocument()

        // Expecting Task C to NOT be there, so use queryByText here.
        expect(screen.queryByText('Test Task C')).not.toBeInTheDocument()
      })
    })
  })
})
