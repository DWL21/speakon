import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'
import { Logo } from './Logo'
import { LoginButton } from '../auth/LoginButton'
import { LogoutButton } from '../auth/LogoutButton'
import { Typography } from './Typography'
import { isLoggedInAtom } from '../../atoms/auth'

export const TopNavBar: React.FC = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const isPracticePage = location.pathname === '/practice';

  return (
    <nav style={{
      width: '100vw',
      height: '60px',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 100,
      boxSizing: 'border-box',
      margin: 0,
      borderBottom: isPracticePage ? '1px solid #E7E7E8' : 'none'
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
        gap: '17px'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="label" color="black" style={{ cursor: 'pointer' }}>
            홈으로
          </Typography>
        </Link>
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <LoginButton onClick={handleLoginClick} />
        )}
      </div>
    </nav>
  )
} 