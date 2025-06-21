import React from 'react'
import { TopBar } from './TopBar'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      <TopBar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
} 