import axios from "axios"
import { UpdateDomainTaskModelType } from "../features/TodolistsList/tasks.reducer"

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "1b9bc2ff-37c7-4083-9ab4-b71c1c113dfa",
  },
}
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
})

// api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<ResponseType>(`todo-lists/${arg.id}`, { title: arg.title })
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  createTask(arg: AddTaskArgs) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
export type AddTaskArgs = {
  title: string
  todolistId: string
}
export type RemoveTaskArgType = {
  taskId: string
  todolistId: string
}
export type UpdateTaskArgs = {
  taskId: string
  domainModel: UpdateDomainTaskModelType
  todolistId: string
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
export type UpdateTodolistTitleArgType = {
  id: string
  title: string
}
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>("auth/login", data)
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me")
  },
}

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
