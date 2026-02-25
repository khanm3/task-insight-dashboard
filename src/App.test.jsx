import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('<App />', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  const setFilter = async (filterName) => {
    const regex = new RegExp(filterName, "i")
    const filterButton = await screen.findByRole("radio", { name: regex })
    await user.click(filterButton)
  }

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

    beforeEach(() => {
      localStorage.clear()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    test('shows only incomplete tasks when the incomplete filter is selected', async () => {
      render(<App />)

      await setFilter("incomplete")

      await waitFor(() => {
        expect(screen.getByText('Test Task A')).toBeInTheDocument()
        expect(screen.getByText('Test Task B')).toBeInTheDocument()

        // Expecting Task C to NOT be there, so use queryByText here.
        expect(screen.queryByText('Test Task C')).not.toBeInTheDocument()
      })
    })
  })

  describe('persistence', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Buy milk', completed: false }
        ]
      })
    })

    test('completed filter persists after reload', async () => {
      const { unmount } = render(<App />)

      await setFilter('completed')

      // Simulate closing the app.
      unmount()

      render(<App />)
      const reloadedCompletedButton = await screen.findByRole('radio', { name: /completed/i })
      expect(reloadedCompletedButton).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('toggle completion behavior', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Test Task A', completed: false },
          { id: 2, title: 'Test Task B', completed: true },
        ]
      })
    })

    test('toggling a task while filtered by Incomplete removes it from view', async () => {
      render(<App />)
      await setFilter("incomplete")

      // Precondition: Task A in view
      const taskA = await screen.findByRole('listitem', { name: /Test Task A/i })
      expect(taskA).toBeInTheDocument()

      // Toggle checkbox
      const checkbox = within(taskA).getByRole("checkbox")
      await user.click(checkbox)

      // Postcondition: Task A not in view
      expect(screen.queryByRole('listitem', { name: /Test Task A/i })).not.toBeInTheDocument()
    })

    test('toggling a task while filtered by Completed removes it from view', async () => {
      render(<App />)
      await setFilter("completed")

      // Precondition: Task B in view
      const taskB = await screen.findByRole("listitem", { name: /Test Task B/i })
      expect(taskB).toBeInTheDocument()

      // Toggle checkbox
      const checkbox = within(taskB).getByRole("checkbox")
      await user.click(checkbox)

      // Postcondition: Task B not in view
      expect(screen.queryByRole("listitem", { name: /Test Task A/i })).not.toBeInTheDocument()
    })

    test('clicking a checkbox toggles completion status', async () => {
      render(<App />)
      const taskA = await screen.findByRole("listitem", { name: /Test Task A/i })
      const checkbox = within(taskA).getByRole("checkbox")

      // Precondition: Task A status is incomplete
      expect(checkbox).not.toBeChecked()

      // Toggle checkbox
      await user.click(checkbox)

      // Postcondition: Task A status is complete
      expect(checkbox).toBeChecked()

      // Optional: Verify toggle back works
      await user.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('task title editing', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Buy milk', completed: false },
          { id: 2, title: 'Do laundry', completed: false }
        ]
      })
    })

    test('clicking a task title enters edit mode', async () => {
      render(<App />)

      // Precondition: title exists
      const taskItem = await screen.findByRole('listitem', { name: /Buy milk/i })
      const title = within(taskItem).getByRole('heading', { name: /Buy milk/i })
      expect(title).toBeInTheDocument()
      expect(within(taskItem).queryByRole('textbox')).not.toBeInTheDocument()

      // Action: click the task title
      await user.click(title)

      // Postcondition: input appears and is focused
      const input = within(taskItem).getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveFocus()
    })

    test('pressing Enter updates the task title', async () => {
      render(<App />)
  
      // Precondition: task exists
      const taskItem = await screen.findByRole('listitem', { name: /buy milk/i })
      const title = within(taskItem).getByRole('heading', { name: /buy milk/i })
  
      // Enter edit mode
      await user.click(title)
  
      const input = within(taskItem).getByRole('textbox')
      expect(input).toHaveFocus()
  
      // Action: change value and press Enter
      await user.clear(input)
      await user.type(input, "Buy oat milk{enter}")
  
      // Postcondition:
      // 1. Input disappears
      expect(within(taskItem).queryByRole('textbox')).not.toBeInTheDocument()
  
      // 2. Heading now shows updated title
      expect(within(taskItem).getByRole('heading', { name: /buy oat milk/i })).toBeInTheDocument()
    })
  
    test('pressing Escape cancels editing and restores original title', async () => {
      render(<App />)
  
      // Precondition: task exists
      const taskItem = await screen.findByRole('listitem', { name: /buy milk/i })
      const title = within(taskItem).getByRole('heading', { name: /buy milk/i })
  
      // Enter edit mode
      await user.click(title)
  
      const input = within(taskItem).getByRole('textbox')
      expect(input).toHaveFocus()
  
      // Action: change value and press Escape
      await user.clear(input)
      await user.type(input, 'Buy oat milk')
      await user.keyboard('{Escape}')
  
      // Postcondition:
      // 1. Input dissappears
      expect(within(taskItem).queryByRole('textbox')).not.toBeInTheDocument()
  
      // 2. Original title remains
      expect(within(taskItem).getByRole('heading', { name: /buy milk/i })).toBeInTheDocument()
  
      // 3. Updated title should not exist
      expect(
        within(taskItem).queryByRole('heading', { name: /buy oat milk/i })
      ).not.toBeInTheDocument()
    })
  
    test("blurring the input saves the updated task title", async () => {
      render(<App />)
  
      // Precondition: task exists
      const taskItem = await screen.findByRole("listitem", { name: /buy milk/i })
      const title = within(taskItem).getByRole("heading", { name: /buy milk/i })
  
      // Enter edit mode
      await user.click(title)
  
      const input = within(taskItem).getByRole("textbox")
      expect(input).toHaveFocus()
  
      // Action: change value
      await user.clear(input)
      await user.type(input, "Buy oat milk")
  
      // Blur the input (simulate clicking elsewhere)
      await user.tab()
  
      // Postcondition:
      // 1. Input disappears
      expect(within(taskItem).queryByRole("textbox")).not.toBeInTheDocument()
  
      // 2. Heading now shows updated title
      expect(
        within(taskItem).getByRole("heading", { name: /buy oat milk/i })
      ).toBeInTheDocument()
    })
  
    test("empty task title reverts to original", async () => {
      render(<App />)
  
      // Precondition: task exists
      const taskItem = await screen.findByRole("listitem", { name: /buy milk/i })
      const title = within(taskItem).getByRole("heading", { name: /buy milk/i })
  
      // Enter edit mode
      await user.click(title)
      const input = within(taskItem).getByRole("textbox")
      expect(input).toHaveFocus()
  
      // Action: clear input and press Enter
      await user.clear(input)
      await user.keyboard('{Enter}')
  
      // Postcondition:
      // 1. Input disappears
      expect(within(taskItem).queryByRole("textbox")).not.toBeInTheDocument()
  
      // 2. Original title remains
      expect(within(taskItem).getByRole("heading", { name: /buy milk/i })).toBeInTheDocument()
  
      // 3. Empty title does not exist
      expect(
        within(taskItem).queryByRole("heading", { name: /^$/ })
      ).not.toBeInTheDocument()
    })
  
    test('clicking another task saves edits and switches editing', async () => {
      render(<App />)
  
      // Precondition: tasks exist
      const taskAItem = await screen.findByRole('listitem', { name: /buy milk/i })
      const taskBItem = await screen.findByRole('listitem', { name: /do laundry/i })
  
      const taskATitle = within(taskAItem).getByRole('heading', { name: /buy milk/i })
      const taskBTitle = within(taskBItem).getByRole('heading', { name: /do laundry/i })
  
      // Action: click Task A to enter edit mode
      await user.click(taskATitle)
      const taskAInput = within(taskAItem).getByRole('textbox')
      expect(taskAInput).toHaveFocus()
  
      // Type a change into Task A
      await user.clear(taskAInput)
      await user.type(taskAInput, 'Buy oat milk')
  
      // Action: click Task B to switch editing
      await user.click(taskBTitle)
  
      // Postconditions:
  
      // 1. Task A saved changes
      expect(within(taskAItem).queryByRole('textbox')).not.toBeInTheDocument()
      expect(within(taskAItem).getByRole('heading', { name: /buy oat milk/i })).toBeInTheDocument()
      expect(within(taskAItem).queryByRole('heading', { name: /buy milk/i })).not.toBeInTheDocument()
  
      // 2. Task B entered edit mode
      const taskBInput = within(taskBItem).getByRole('textbox')
      expect(taskBInput).toBeInTheDocument()
      expect(taskBInput).toHaveFocus()
    })
  })

  describe('task deleting', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Buy milk', completed: false },
          { id: 2, title: 'Do laundry', completed: false }
        ]
      })
    })

    test("clicking delete button removes task from the list", async () => {
      render(<App />)

      // Precondition: task exists
      const taskItem = await screen.findByRole("listitem", { name: /Buy milk/i })
      expect(taskItem).toBeInTheDocument()

      // Act: click the delete button inside that task
      const deleteButton = within(taskItem).getByRole("button", { name: /delete task buy milk/i })
      await user.click(deleteButton)

      // Postcondition: task no longer exists
      expect(screen.queryByRole("listitem", { name: /Buy milk/i })).not.toBeInTheDocument()
    })
  })

  describe('task adding', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => [
          { id: 1, title: 'Buy milk', completed: false },
          { id: 2, title: 'Do laundry', completed: false }
        ]
      })
    })

    test('adding a new task updates the task list and clears input', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Precondition: input exists and task does not yet exist
      const input = screen.getByPlaceholderText(/add new task/i)
      expect(input).toBeInTheDocument()
      expect(screen.queryByText("Walk the dog")).not.toBeInTheDocument()

      // Action: type a new task and submit (Enter)
      await user.type(input, "Walk the dog{Enter}")

      // Postcondition:
      // 1. New task appears in the list
      expect(screen.getByText("Walk the dog")).toBeInTheDocument()

      // 2. Input is cleared
      expect(input).toHaveValue("")
    })
  })
})
