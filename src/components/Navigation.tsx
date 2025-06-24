import { Link, useLocation } from 'react-router-dom'
import { Typography } from './ui/Typography'
import { Logo } from './Logo'

export function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '홈' },
    { path: '/about', label: '소개' },
    { path: '/contact', label: '연락처' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav style={{ 
      background: 'white', 
      borderBottom: '1px solid #f1f2f5', 
      padding: '16px 0',
      marginBottom: '32px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo width={120} height={24} />
        </Link>
        
        <div style={{ display: 'flex', gap: '32px' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: isActive(item.path) ? '#f1f2f5' : 'transparent',
                transition: 'background-color 0.2s'
              }}
            >
              <Typography 
                variant="body1" 
                color={isActive(item.path) ? 'normal' : 'gray500'}
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 