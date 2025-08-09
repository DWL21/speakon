import React, { useState } from 'react';
import { colors } from '../../theme/colors';

interface PracticeToolbarProps {
  onViewToggle?: () => void;
  onTimeSettingClick?: () => void;
  onEditScript?: () => void;
  onPracticeToggle?: () => void;
  onEnd?: () => void;
  currentPageTime?: { minutes: number; seconds: number };
  isPracticing?: boolean;
  disabled?: boolean;
  currentSlide?: number;
  totalSlides?: number;
}

export const PracticeToolbar: React.FC<PracticeToolbarProps> = ({
  onViewToggle,
  onTimeSettingClick,
  onEditScript,
  onPracticeToggle,
  onEnd,
  currentPageTime = { minutes: 0, seconds: 0 },
  isPracticing = false,
  disabled = false,
  currentSlide = 1,
  totalSlides = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [viewHovered, setViewHovered] = useState(false);
  const [scriptHovered, setScriptHovered] = useState(false);
  const [timerHovered, setTimerHovered] = useState(false);
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
    <div style={toolbarContainerStyle}>
      <div style={toolbarStyle}>
        {/* 좌측 영역: 뷰 토글 + 구분선 */}
        <div style={leftSectionStyle}>
          <button
            onClick={onViewToggle}
            style={{
              ...viewToggleButtonStyle,
              backgroundColor: viewHovered ? colors.fill.neutral : 'transparent',
            }}
            onMouseEnter={() => setViewHovered(true)}
            onMouseLeave={() => setViewHovered(false)}
            disabled={disabled}
          >
            <ViewIcon />
          </button>
          <div style={dividerStyle}>
            <svg width="6" height="33" viewBox="0 0 6 33" fill="none">
              <path
                d="M3 5L3 28"
                stroke={colors.line.alternative}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 중앙 영역: 슬라이드 정보와 현재 페이지 시간 표시 또는 연습 중 상태 */}
        <div 
          style={{
            ...timerDisplayStyle,
            cursor: onPracticeToggle ? 'pointer' : 'default',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'all 0.2s ease',
            flexDirection: 'column',
            padding: '6px 10px',
            gap: '0',
          }}
          onClick={handleTimerDisplayClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 슬라이드 정보 */}
          <div style={slideInfoStyle}>
            <span>슬라이드 {currentSlide}</span>
          </div>
          
          {/* 타이머 */}
          <div style={timerTextStyle}>
            {isPracticing ? (
              <span>연습 중</span>
            ) : (
              <>
                <span>{formatTime(currentPageTime.minutes)}</span>
                <span>:</span>
                <span>{formatTime(currentPageTime.seconds)}</span>
              </>
            )}
          </div>
        </div>

        {/* 우측 영역: 액션 버튼들 */}
        <div style={rightSectionStyle}>
          <div style={actionButtonsStyle}>
            <button
              onClick={onEditScript}
              style={{
                ...iconButtonStyle,
                backgroundColor: scriptHovered ? colors.fill.neutral : 'transparent',
              }}
              onMouseEnter={() => setScriptHovered(true)}
              onMouseLeave={() => setScriptHovered(false)}
              disabled={disabled}
            >
              <ScriptIcon />
            </button>
            <button
              onClick={onTimeSettingClick}
              style={{
                ...iconButtonStyle,
                backgroundColor: timerHovered ? colors.fill.neutral : 'transparent',
              }}
              onMouseEnter={() => setTimerHovered(true)}
              onMouseLeave={() => setTimerHovered(false)}
              disabled={disabled}
            >
              <TimerGoalIcon />
            </button>
          </div>
          <button
            onClick={onEnd}
            style={endButtonStyle}
            disabled={disabled}
          >
            종료
          </button>
        </div>
      </div>
    </div>
  );
};

// 아이콘 컴포넌트들 - 피그마 디자인에서 추출
const ViewIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path 
      d="M3.9074 9.02634C7.53762 2.82455 16.4624 2.82455 20.0926 9.02634C21.3025 11.0932 21.3025 13.6568 20.0926 15.7237C16.4624 21.9254 7.53762 21.9254 3.9074 15.7237C2.69753 13.6568 2.69753 11.0932 3.9074 9.02634Z" 
      stroke="#7D7E83" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M15.5567 12.4357C15.5567 14.4311 13.9637 16.0483 11.9994 16.0483C10.0352 16.0483 8.44331 14.4311 8.44331 12.4357C8.44331 10.4391 10.0352 8.82199 11.9994 8.82199C13.9637 8.82199 15.5567 10.4391 15.5567 12.4357Z" 
      stroke="#7D7E83" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ScriptIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1009_2446)">
      <path d="M21 12.375V17.775C21 19.755 19.38 21.375 17.4 21.375H6.59998C4.61998 21.375 3 19.755 3 17.775V6.97501C3 4.99501 4.61998 3.375 6.59998 3.375H12" stroke="#7D7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5001 9.54477L14.4001 13.6447C14.2201 13.8247 14.0101 13.9248 13.7601 13.9448L11.3101 14.1747C10.6701 14.2347 10.1301 13.6848 10.1901 13.0448L10.4101 10.6648C10.4301 10.4148 10.5301 10.1947 10.7101 10.0247L14.8501 5.88477L18.5001 9.54477V9.54477Z" stroke="#7D7E83" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20.7001 7.35453L18.5001 9.54454L14.8501 5.88453L17.0401 3.69453C17.4401 3.29453 18.1001 3.29453 18.5001 3.69453L20.7001 5.88453C21.0901 6.28453 21.0901 6.95453 20.7001 7.35453V7.35453Z" stroke="#7D7E83" strokeWidth="1.5" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1009_2446">
        <rect width="24" height="24" fill="white" transform="translate(0 0.375)"/>
      </clipPath>
    </defs>
  </svg>
);

const TimerGoalIcon = () => (
  <svg width="18" height="21" viewBox="0 0 18 21" fill="none">
    <path 
      d="M8.99988 19.4041C13.0702 19.4041 16.3699 15.9925 16.3699 11.7841C16.3699 7.57565 13.0702 4.16406 8.99988 4.16406C4.92954 4.16406 1.62988 7.57565 1.62988 11.7841C1.62988 15.9925 4.92954 19.4041 8.99988 19.4041Z" 
      stroke="#7D7E83" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M1.86987 3.42453L4.66987 1.39453" 
      stroke="#7D7E83" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round"
    />
    <path 
      d="M16.6298 3.42453L13.8298 1.39453" 
      stroke="#7D7E83" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round"
    />
    <path 
      d="M9 8.7041V11.9841L11.26 13.9341" 
      stroke="#7D7E83" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);


// 스타일 정의 - 피그마 디자인에 정확히 맞춤
const toolbarContainerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 0',
  backgroundColor: colors.background.normal,
};

const toolbarStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  borderRadius: '15px',
  border: `0.5px solid ${colors.fill.neutral}`,
  boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  padding: '4px 16px',
  gap: '12px',
  height: '48px',
  fontFamily: 'Pretendard, sans-serif',
};

const leftSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
};

const viewToggleButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '7px',
  transition: 'background-color 0.2s ease',
};

const dividerStyle: React.CSSProperties = {
  height: '33px',
  width: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const timerDisplayStyle: React.CSSProperties = {
  backgroundColor: '#F7F7F8',
  borderRadius: '6px',
  padding: '8px 10px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '33px',
  width: '76px',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: 400,
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};

const rightSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0 4px',
};

const actionButtonsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const iconButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '7px',
  transition: 'background-color 0.2s ease',
  width: '34px',
  height: '34px',
};

const endButtonStyle: React.CSSProperties = {
  backgroundColor: colors.primary.normal,
  color: colors.static.white,
  border: 'none',
  borderRadius: '8px',
  padding: '7px 15px',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: 'Pretendard, sans-serif',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  lineHeight: 1,
};

const slideInfoStyle: React.CSSProperties = {
  fontSize: '8px',
  fontWeight: 400,
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
  lineHeight: 1,
};

const timerTextStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '13px',
  fontWeight: 400,
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};