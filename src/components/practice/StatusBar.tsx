import React from 'react';
import { colors } from '../../theme/colors';

interface StatusBarProps {
  currentSlide: number;
  totalSlides: number;
  onTimeSettingClick?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  currentSlide,
  totalSlides,
  onTimeSettingClick,
}) => {
  return (
    <div style={statusBarStyle}>
      {/* 왼쪽: 빈 공간 */}
      <div style={emptySpaceStyle}></div>
      
      {/* 중앙: 페이지 번호 */}
      <div style={pageIndicatorStyle}>
        <span>{currentSlide}</span>
        <span>/</span>
        <span>{totalSlides}</span>
      </div>
      
      {/* 우측: 액션 버튼들 */}
      <div style={actionButtonsStyle}>
        <div style={clickableActionButtonStyle} onClick={onTimeSettingClick}>
          🕐 시간 설정
        </div>
        <div style={actionButtonStyle}>
          ✏️ 대본 작성
        </div>
      </div>
    </div>
  );
};

const statusBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 41px',
  height: '60px',
};

const emptySpaceStyle: React.CSSProperties = {
  width: '125px',
};

const pageIndicatorStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  fontSize: '18px',
  fontWeight: 500,
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};

const actionButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '9px',
};

const actionButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '12px',
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};

const clickableActionButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  cursor: 'pointer',
};