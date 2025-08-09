import React, { useState } from 'react';
import { colors } from '../../theme/colors';
import { Button } from '../ui/Button';

interface TimerControlProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  isPracticing?: boolean;
  onPracticeToggle?: () => void;
  onExitClick?: () => void;
}

export const TimerControl: React.FC<TimerControlProps> = ({
  minutes,
  seconds,
  isRunning,
  onToggle,
  onReset,
  isPracticing = false,
  onPracticeToggle,
  onExitClick: _onExitClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const handleTimerDisplayClick = () => {
    if (onPracticeToggle) {
      onPracticeToggle();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={timerControlStyle}>
      <div 
        style={{
          ...timerDisplayStyle,
          backgroundColor: 'transparent',
          cursor: onPracticeToggle ? 'pointer' : 'default',
          fontWeight: isHovered ? 600 : 500,
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.2s ease',
        }}
        onClick={handleTimerDisplayClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isPracticing ? '연습 중' : `${formatTime(minutes)} : ${formatTime(seconds)}`}
      </div>
      
      <div style={timerButtonsStyle}>
        <Button 
          variant={isRunning ? "secondary" : "primary"}
          size="small"
          onClick={onToggle}
          style={{ 
            width: '53px',
            height: '30px',
            padding: '7px 15px',
            minWidth: 'auto',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
        >
          {isRunning ? '중지' : '재생'}
        </Button>
        <Button 
          variant="ghost"
          size="small"
          onClick={onReset}
          style={{ 
            color: colors.primary.normal,
            width: '53px',
            height: '30px',
            padding: '7px 15px',
            minWidth: 'auto',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
        >
          초기화
        </Button>
      </div>
    </div>
  );
};

const timerControlStyle: React.CSSProperties = {
  display: 'flex',
  width: '250px',
  height: '57px',
  padding: '7px 0px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'nowrap',
};

const timerDisplayStyle: React.CSSProperties = {
  display: 'flex',
  width: '135px',
  height: '41px',
  padding: '0px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  backgroundColor: 'transparent',
  borderRadius: '8px',
  fontSize: '18px',
  fontWeight: 500,
  color: colors.label.normal,
  fontFamily: 'Pretendard, sans-serif',
  lineHeight: 1,
  boxSizing: 'border-box',
};

const timerButtonsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexWrap: 'nowrap',
  flexShrink: 0,
};