import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.reducer"
import { instance } from "common/api/instance"
import { ResponseType } from "common/types/ResponseType"
import { TaskPriorities, TaskStatuses } from "common/enums/enums"
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
export type UpdateTodolistTitleArgType = {
  id: string
  title: string
}

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
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
