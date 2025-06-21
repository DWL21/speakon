import { useAtom } from 'jotai'
import { userAtom, isLoggedInAtom, User } from '@/atoms/userState'

export function useAuth() {
  const [user, setUser] = useAtom(userAtom)
  const [isLoggedIn] = useAtom(isLoggedInAtom)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
} 