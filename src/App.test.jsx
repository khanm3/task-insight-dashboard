import { render, screen } from '@testing-library/react'
import App from './App'

test('renders task dashboard', () => {
    render(<App />)
    expect(screen.getByText(/task insight dashboard/i)).toBeInTheDocument()
})
