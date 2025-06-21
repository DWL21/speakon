import { useState, useEffect } from 'react'
import { userService } from '@/services/userService'
import { User } from '@/types/user'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await userService.getUsers()
        setUsers(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const refetch = () => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await userService.getUsers()
        setUsers(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }

  return { users, loading, error, refetch }
} 