import React from 'react';
import { SlideCard } from './SlideCard';
import { TimerControl } from './TimerControl';
import { colors } from '../../theme/colors';
import { SlideInput } from '../ScriptModal/ScriptModalForm';

interface SidebarProps {
  slides: SlideInput[];
  currentSlide: number;
  fileName: string;
  timer: { minutes: number; seconds: number };
  isTimerRunning: boolean;
  onSlideClick: (slideNumber: number) => void;
  onFileNameChange: (fileName: string) => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  slides,
  currentSlide,
  fileName,
  timer,
  isTimerRunning,
  onSlideClick,
  onFileNameChange,
  onToggleTimer,
  onResetTimer,
}) => {
  return (
    <div style={sidebarStyle}>
      {/* 상단: 파일명 입력 */}
      <div style={fileNamePanelStyle}>
        <input 
          value={fileName}
          onChange={(e) => onFileNameChange(e.target.value)}
          style={fileNameInputStyle}
          placeholder="파일명을 입력하세요"
        />
      </div>

      {/* 타이머 컨트롤 */}
      <div style={topControlPanelStyle}>
        <TimerControl
          minutes={timer.minutes}
          seconds={timer.seconds}
          isRunning={isTimerRunning}
          onToggle={onToggleTimer}
          onReset={onResetTimer}
        />
      </div>

      {/* 슬라이드 리스트 */}
      <div style={slideListStyle}>
        {slides.map((slide) => (
          <SlideCard
            key={slide.slideNumber}
            slideNumber={slide.slideNumber}
            isActive={currentSlide === slide.slideNumber}
            onClick={() => onSlideClick(slide.slideNumber)}
          />
        ))}
      </div>
    </div>
  );
};

const sidebarStyle: React.CSSProperties = {
  width: '293px',
  maxWidth: '293px',
  backgroundColor: colors.background.normal,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderTop: `1px solid ${colors.line.normal}`,
};

const slideListStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  backgroundColor: colors.background.normal,
};

const fileNamePanelStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  borderBottom: `1px solid ${colors.line.normal}`,
  padding: '16px',
};

const topControlPanelStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  borderBottom: `1px solid ${colors.line.normal}`,
  padding: '16px 8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '57px',
  boxSizing: 'border-box',
};

const fileNameInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 16px',
  border: 'none',
  fontSize: '13px',
  color: colors.label.normal,
  fontFamily: 'Pretendard, sans-serif',
  backgroundColor: 'transparent',
  outline: 'none',
  boxSizing: 'border-box',
  height: '32px',
};