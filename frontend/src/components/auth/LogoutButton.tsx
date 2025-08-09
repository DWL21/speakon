import React from 'react';
import { useAtom } from 'jotai';
import { isLoggedInAtom, userAtom } from '../../atoms/auth';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export interface LogoutButtonProps {
  onClick?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    onClick?.();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        display: 'flex',
        padding: '7px 15px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        borderRadius: '8px',
        background: colors.fill.normal,
        border: 'none',
        cursor: 'pointer',
        fontFamily: typography.button[2].fontFamily,
        fontWeight: typography.button[2].fontWeight,
        fontSize: typography.button[2].fontSize,
        lineHeight: typography.button[2].lineHeight,
        color: colors.primary.normal,
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.fill.strong;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.fill.normal;
      }}
    >
      로그아웃
    </button>
  );
};