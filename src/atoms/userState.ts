import { atom } from 'jotai'

export interface User {
  id: string
  name: string
  email: string
}

export const userAtom = atom<User | null>(null)
export const isLoggedInAtom = atom((get) => get(userAtom) !== null) 