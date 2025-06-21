import { apiClient } from '@/api/client'
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user'
import { ApiResponse } from '@/types/common'

export const userService = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return apiClient.get<ApiResponse<User[]>>('/users')
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(`/users/${id}`)
  },

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return apiClient.post<ApiResponse<User>>('/users', userData)
  },

  async updateUser(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    return apiClient.put<ApiResponse<User>>(`/users/${id}`, userData)
  },

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/users/${id}`)
  },
} 