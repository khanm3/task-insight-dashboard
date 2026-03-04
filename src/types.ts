export interface Task {
  id: string
  title: string
  completed: boolean
}

export type Filter = "all" | "completed" | "incomplete"

export interface ApiTask {
  userId: number
  id: number
  title: string
  completed: boolean
}
