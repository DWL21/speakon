import { Link, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { Logo } from './Logo'
import { LoginButton } from '../auth/LoginButton'
import { LogoutButton } from '../auth/LogoutButton'
import { Typography } from './Typography'
import { isLoggedInAtom } from '../../atoms/auth'

export const TopNavBar: React.FC = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav style={{
      width: '100vw',
      height: '60px',
      backgroundColor: 'white',
      borderBottom: '1px solid #f1f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      margin: 0
    }}>
      {/* 왼쪽: 로고 */}
      <Link to="/" style={{ 
        textDecoration: 'none', 
        display: 'flex', 
        alignItems: 'center'
      }}>
        <Logo />
      </Link>
      
      {/* 오른쪽: 텍스트 + 로그인 버튼 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="body" color="black" style={{ cursor: 'pointer' }}>
            홈으로
          </Typography>
        </Link>
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <LoginButton width={64} height={30} onClick={handleLoginClick} />
        )}
      </div>
    </nav>
  )
} 