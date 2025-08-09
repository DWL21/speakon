import React, { useEffect } from 'react';
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
  pdfFile?: File | null;
  onSlideClick: (slideNumber: number) => void;
  onFileNameChange: (fileName: string) => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  isPracticing?: boolean;
  onPracticeToggle?: () => void;
  onExitClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  slides,
  currentSlide,
  fileName,
  timer,
  isTimerRunning,
  pdfFile,
  onSlideClick,
  onFileNameChange,
  onToggleTimer,
  onResetTimer,
  isPracticing = false,
  onPracticeToggle,
  onExitClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 입력 필드에 포커스가 있을 때는 키보드 이벤트 무시
      const activeElement = document.activeElement;
      if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.hasAttribute('contenteditable')
      )) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          if (currentSlide > 1) {
            onSlideClick(currentSlide - 1);
          }
          break;
        case 'ArrowDown':
          if (currentSlide < slides.length) {
            onSlideClick(currentSlide + 1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, slides.length, onSlideClick]);

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
          isPracticing={isPracticing}
          onPracticeToggle={onPracticeToggle}
          onExitClick={onExitClick}
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
            pdfFile={pdfFile}
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