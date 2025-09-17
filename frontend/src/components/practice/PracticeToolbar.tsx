import React, { useState } from 'react';
import { colors } from '../../theme/colors';

interface PracticeToolbarProps {
  onViewToggle?: () => void;
  onTimeSettingClick?: () => void;
  onEditScript?: () => void;
  onGenerateScript?: () => void;
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
  onGenerateScript,
  onPracticeToggle,
  onEnd,
  currentPageTime = { minutes: 0, seconds: 0 },
  isPracticing = false,
  disabled = false,
  currentSlide = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [viewHovered, setViewHovered] = useState(false);
  const [scriptHovered, setScriptHovered] = useState(false);
  const [timerHovered, setTimerHovered] = useState(false);
  const [magicHovered, setMagicHovered] = useState(false);
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
        {/* 좌측 영역: 마법사 버튼 + 3버튼 그룹 + 구분선 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onGenerateScript}
            style={{
              ...magicButtonStyle,
              backgroundColor: magicHovered ? '#2a74e6' : colors.primary.normal,
              opacity: disabled ? 0.6 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={() => setMagicHovered(true)}
            onMouseLeave={() => setMagicHovered(false)}
            disabled={disabled}
            aria-label="대본 생성"
            title="대본 생성"
          >
            <MagicIcon />
          </button>
          <div style={leftSectionStyle}>
            <button
              onClick={onViewToggle}
              style={{
                ...roundedIconButtonStyle,
                backgroundColor: colors.fill.neutral,
                outline: viewHovered ? `1px solid ${colors.fill.neutral}` : 'none',
              }}
              onMouseEnter={() => setViewHovered(true)}
              onMouseLeave={() => setViewHovered(false)}
              disabled={disabled}
              aria-label="뷰 토글"
            >
              <EyeSlashIcon />
            </button>
            <button
              onClick={onTimeSettingClick}
              style={{
                ...roundedIconButtonStyle,
                backgroundColor: colors.fill.neutral,
                outline: timerHovered ? `1px solid ${colors.fill.neutral}` : 'none',
              }}
              onMouseEnter={() => setTimerHovered(true)}
              onMouseLeave={() => setTimerHovered(false)}
              disabled={disabled}
              aria-label="타이머 설정"
            >
              <ClockIcon />
            </button>
            <button
              onClick={onEditScript}
              style={{
                ...roundedIconButtonStyle,
                backgroundColor: colors.fill.neutral,
                outline: scriptHovered ? `1px solid ${colors.fill.neutral}` : 'none',
              }}
              onMouseEnter={() => setScriptHovered(true)}
              onMouseLeave={() => setScriptHovered(false)}
              disabled={disabled}
              aria-label="대본 편집"
            >
              <PencilIcon />
            </button>
          </div>
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

        {/* 중앙 영역: 타이머 박스 */}
        <button
          onClick={handleTimerDisplayClick}
          style={timerBoxStyle}
          disabled={disabled}
          aria-label="타이머 표시"
        >
          {formatTime(currentPageTime.minutes)}:{formatTime(currentPageTime.seconds)}
        </button>

        {/* 우측 영역: 종료 아이콘 + 라벨 */}
        <div style={rightSectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button onClick={onEnd} style={roundedIconButtonStyle} aria-label="종료" disabled={disabled}>
              <ExitIcon />
            </button>
            <span style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '12px', color: colors.label.normal }}>종료</span>
          </div>
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
  padding: '0 24px',
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

const timerBoxStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  border: `1px solid ${colors.fill.neutral}`,
  borderRadius: '12px',
  width: '70px',
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Pretendard, sans-serif',
  fontSize: '13px',
  color: colors.label.normal,
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

// 32x32 둥근 회색 버튼
const roundedIconButtonStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: colors.fill.neutral,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  cursor: 'pointer',
};

const endButtonStyle: React.CSSProperties = {
  backgroundColor: colors.primary.normal,
  color: colors.static.white,
  border: 'none',
  borderRadius: '8px',
  padding: '6px 12px',
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

// 피그마 Variant9(마법사) 스타일
const magicButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '12px',
  width: '32px',
  height: '32px',
  padding: '0 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const MagicIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.35973 2.1087C8.35973 2.22888 8.40747 2.34413 8.49245 2.42911C8.57743 2.51409 8.69268 2.56183 8.81286 2.56183C8.93303 2.56183 9.04829 2.51409 9.13326 2.42911C9.21824 2.34413 9.26598 2.22888 9.26598 2.1087V0.451172C9.26598 0.330996 9.21824 0.215742 9.13326 0.130764C9.04829 0.0457867 8.93303 -0.00195312 8.81286 -0.00195312C8.69268 -0.00195312 8.57743 0.0457867 8.49245 0.130764C8.40747 0.215742 8.35973 0.330996 8.35973 0.451172V2.1087ZM12.4379 2.14042C12.5204 2.05496 12.5661 1.9405 12.565 1.82169C12.564 1.70289 12.5163 1.58924 12.4323 1.50522C12.3483 1.42121 12.2347 1.37356 12.1159 1.37252C11.9971 1.37149 11.8826 1.41716 11.7971 1.4997L10.6254 2.67148C10.5821 2.71328 10.5476 2.76328 10.5238 2.81857C10.5001 2.87385 10.4876 2.93331 10.487 2.99347C10.4865 3.05364 10.498 3.11331 10.5208 3.16899C10.5435 3.22468 10.5772 3.27527 10.6197 3.31782C10.6623 3.36036 10.7129 3.39401 10.7686 3.41679C10.8243 3.43958 10.8839 3.45104 10.9441 3.45052C11.0042 3.45 11.0637 3.4375 11.119 3.41375C11.1743 3.39 11.2243 3.35548 11.2661 3.3122L12.4379 2.14042ZM6.35964 3.3122C6.40144 3.35548 6.45144 3.39 6.50672 3.41375C6.562 3.4375 6.62146 3.45 6.68163 3.45052C6.74179 3.45104 6.80146 3.43958 6.85715 3.41679C6.91284 3.39401 6.96343 3.36036 7.00597 3.31782C7.04852 3.27527 7.08216 3.22468 7.10495 3.16899C7.12773 3.11331 7.1392 3.05364 7.13867 2.99347C7.13815 2.93331 7.12565 2.87385 7.1019 2.81857C7.07815 2.76328 7.04363 2.71328 7.00036 2.67148L5.82857 1.4997C5.74311 1.41716 5.62865 1.37149 5.50985 1.37252C5.39104 1.37356 5.27739 1.42121 5.19338 1.50522C5.10936 1.58924 5.06171 1.70289 5.06068 1.82169C5.05964 1.9405 5.10532 2.05496 5.18786 2.14042L6.35964 3.3122ZM5.79686 5.57783C5.91703 5.57783 6.03229 5.53009 6.11726 5.44511C6.20224 5.36013 6.24998 5.24488 6.24998 5.1247C6.24998 5.00453 6.20224 4.88927 6.11726 4.8043C6.03229 4.71932 5.91703 4.67158 5.79686 4.67158H4.13933C4.01915 4.67158 3.90389 4.71932 3.81892 4.8043C3.73394 4.88927 3.6862 5.00453 3.6862 5.1247C3.6862 5.24488 3.73394 5.36013 3.81892 5.44511C3.90389 5.53009 4.01915 5.57783 4.13933 5.57783H5.79686ZM13.4864 5.57783C13.6066 5.57783 13.7218 5.53009 13.8068 5.44511C13.8918 5.36013 13.9395 5.24488 13.9395 5.1247C13.9395 5.00453 13.8918 4.88927 13.8068 4.8043C13.7218 4.71932 13.6066 4.67158 13.4864 4.67158H11.8289C11.7087 4.67158 11.5934 4.71932 11.5084 4.8043C11.4235 4.88927 11.3757 5.00453 11.3757 5.1247C11.3757 5.24488 11.4235 5.36013 11.5084 5.44511C11.5934 5.53009 11.7087 5.57783 11.8289 5.57783H13.4864ZM11.7971 8.7497C11.8389 8.79298 11.8889 8.8275 11.9442 8.85125C11.9995 8.875 12.059 8.8875 12.1191 8.88802C12.1793 8.88854 12.239 8.87708 12.2946 8.85429C12.3503 8.83151 12.4009 8.79786 12.4435 8.75532C12.486 8.71278 12.5197 8.66218 12.5424 8.60649C12.5652 8.55081 12.5767 8.49114 12.5762 8.43097C12.5756 8.37081 12.5632 8.31135 12.5394 8.25607C12.5157 8.20078 12.4811 8.15078 12.4379 8.10898L11.2661 6.9372C11.2243 6.89393 11.1743 6.85941 11.119 6.83566C11.0637 6.81191 11.0042 6.79941 10.9441 6.79889C10.8839 6.79836 10.8243 6.80983 10.7686 6.83261C10.7129 6.8554 10.6623 6.88904 10.6197 6.93159C10.5772 6.97413 10.5435 7.02472 10.5208 7.08041C10.498 7.1361 10.4865 7.19577 10.487 7.25593C10.4876 7.3161 10.5001 7.37556 10.5238 7.43084C10.5476 7.48612 10.5821 7.53612 10.6254 7.57792L11.7971 8.7497ZM8.35973 9.79823C8.35973 9.91841 8.40747 10.0337 8.49245 10.1186C8.57743 10.2036 8.69268 10.2514 8.81286 10.2514C8.93303 10.2514 9.04829 10.2036 9.13326 10.1186C9.21824 10.0337 9.26598 9.91841 9.26598 9.79823V8.1407C9.26598 8.02053 9.21824 7.90527 9.13326 7.82029C9.04829 7.73532 8.93303 7.68758 8.81286 7.68758C8.69268 7.68758 8.57743 7.73532 8.49245 7.82029C8.40747 7.90527 8.35973 8.02053 8.35973 8.1407V9.79823ZM10.0399 5.17908C10.1246 5.09414 10.1721 4.9791 10.1721 4.85917C10.1721 4.73924 10.1246 4.6242 10.0399 4.53927L9.39829 3.89764C9.31332 3.81269 9.19809 3.76497 9.07793 3.76497C8.95778 3.76497 8.84255 3.81269 8.75757 3.89764L7.58579 5.07033C7.50085 5.1553 7.45312 5.27053 7.45312 5.39069C7.45312 5.51084 7.50085 5.62607 7.58579 5.71105L8.22742 6.35267C8.31239 6.43762 8.42763 6.48534 8.54778 6.48534C8.66793 6.48534 8.78316 6.43762 8.86814 6.35267L10.0399 5.18089V5.17908ZM7.32117 7.89783C7.40584 7.81289 7.45338 7.69785 7.45338 7.57987C7.45338 7.45799 7.40584 7.34295 7.32117 7.25802L6.67954 6.61639C6.59457 6.53144 6.47934 6.48372 6.35918 6.48372C6.23903 6.48372 6.1238 6.53144 6.03883 6.61639L0.335794 12.3203C0.250846 12.4053 0.203125 12.5205 0.203125 12.6407C0.203125 12.7608 0.250846 12.8761 0.335794 12.961L0.977419 13.6027C1.06239 13.6876 1.17763 13.7353 1.29778 13.7353C1.41793 13.7353 1.53316 13.6876 1.61814 13.6027L7.32117 7.89783Z" fill="#FFFFFF"/>
  </svg>
);

// Eye slash (간단화된 벡터)
const EyeSlashIcon = () => (
  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5C2.6 2.5 4.8 1 7 1c2.2 0 4.4 1.5 6 4-1.6 2.5-3.8 4-6 4-2.2 0-4.4-1.5-6-4Z" stroke="#7D7E83" strokeWidth="1"/>
    <path d="M2 1L11 9" stroke="#7D7E83" strokeWidth="1.2"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8.5" stroke="#7D7E83"/>
    <path d="M10 5v5l3 2" stroke="#7D7E83" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PencilIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#7D7E83" fill="none"/>
    <path d="M14.06 6.19l3.75 3.75L20.5 7.25c.69-.69.69-1.81 0-2.5l-1.25-1.25c-.69-.69-1.81-.69-2.5 0l-2.69 2.69z" stroke="#7D7E83" fill="none"/>
  </svg>
);

const ExitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17l5-5-5-5" stroke="#7D7E83" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 12h11" stroke="#7D7E83" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);