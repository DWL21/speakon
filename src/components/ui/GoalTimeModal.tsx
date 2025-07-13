import React, { useState } from 'react';
import { colors } from '../../theme/colors';

interface GoalTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (goalMinutes: number, goalSeconds: number, showStopwatch: boolean) => void;
  embedded?: boolean; // PDF 뷰어 내부에서 사용할 때
  initialMinutes?: number;
  initialSeconds?: number;
}

export const GoalTimeModal: React.FC<GoalTimeModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  embedded = false,
  initialMinutes = 10,
  initialSeconds = 30,
}) => {
  const [goalMinutes, setGoalMinutes] = useState(initialMinutes);
  const [goalSeconds, setGoalSeconds] = useState(initialSeconds);
  const [showStopwatch, setShowStopwatch] = useState(true);
  const [showDetailedInput, setShowDetailedInput] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [inputSeconds, setInputSeconds] = useState(initialSeconds.toString());

  if (!isOpen) return null;

  const handleDecrease = () => {
    const totalSeconds = goalMinutes * 60 + goalSeconds - 30;
    if (totalSeconds >= 30) { // 최소 30초
      const newMinutes = Math.floor(totalSeconds / 60);
      const newSeconds = totalSeconds % 60;
      setGoalMinutes(newMinutes);
      setGoalSeconds(newSeconds);
    }
  };

  const handleIncrease = () => {
    const totalSeconds = goalMinutes * 60 + goalSeconds + 30;
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    setGoalMinutes(newMinutes);
    setGoalSeconds(newSeconds);
  };

  const handleTimeClick = () => {
    setInputMinutes(goalMinutes.toString());
    setInputSeconds(goalSeconds.toString());
    setShowDetailedInput(true);
  };

  const handleDetailedInputSave = () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    if (minutes >= 0 && seconds >= 0 && seconds < 60) {
      setGoalMinutes(minutes);
      setGoalSeconds(seconds);
      setShowDetailedInput(false);
    }
  };

  const handleDetailedInputCancel = () => {
    setShowDetailedInput(false);
  };

  const handleComplete = () => {
    onComplete(goalMinutes, goalSeconds, showStopwatch);
  };

  const formatTime = () => {
    return `${goalMinutes}분 ${goalSeconds}초`;
  };

  // embedded 모드일 때는 오버레이 없이 모달만 렌더링
  if (embedded) {
    return (
      <div style={modalStyle}>
        <div style={titleStyle}>목표시간</div>
        <div style={descriptionStyle}>발표 시간을 설정하세요</div>
        
        <div style={timePickerContainerStyle}>
          <button style={buttonStyle} onClick={handleDecrease}>
            -
          </button>
          
          {showDetailedInput ? (
            <div style={detailedInputContainerStyle}>
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                style={inputStyle}
                placeholder="분"
                min="0"
              />
              <span style={separatorStyle}>분</span>
              <input
                type="number"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                style={inputStyle}
                placeholder="초"
                min="0"
                max="59"
              />
              <span style={separatorStyle}>초</span>
              <div style={inputButtonsStyle}>
                <button style={inputButtonStyle} onClick={handleDetailedInputSave}>
                  확인
                </button>
                <button style={inputButtonStyle} onClick={handleDetailedInputCancel}>
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div style={timeDisplayStyle} onClick={handleTimeClick}>
              {formatTime()}
            </div>
          )}
          
          <button style={buttonStyle} onClick={handleIncrease}>
            +
          </button>
        </div>

        <div style={checkboxContainerStyle}>
          <input
            type="checkbox"
            id="showStopwatch"
            checked={showStopwatch}
            onChange={(e) => setShowStopwatch(e.target.checked)}
            style={checkboxStyle}
          />
          <label htmlFor="showStopwatch" style={checkboxLabelStyle}>
            연습 시 스톱워치 보기
          </label>
        </div>

        <button style={completeButtonStyle} onClick={handleComplete}>
          완료
        </button>
      </div>
    );
  }

  // 기본 모드 (전체 화면 오버레이)
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={titleStyle}>목표시간</div>
        <div style={descriptionStyle}>발표 시간을 설정하세요</div>
        
        <div style={timePickerContainerStyle}>
          <button style={buttonStyle} onClick={handleDecrease}>
            -
          </button>
          
          {showDetailedInput ? (
            <div style={detailedInputContainerStyle}>
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                style={inputStyle}
                placeholder="분"
                min="0"
              />
              <span style={separatorStyle}>분</span>
              <input
                type="number"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                style={inputStyle}
                placeholder="초"
                min="0"
                max="59"
              />
              <span style={separatorStyle}>초</span>
              <div style={inputButtonsStyle}>
                <button style={inputButtonStyle} onClick={handleDetailedInputSave}>
                  확인
                </button>
                <button style={inputButtonStyle} onClick={handleDetailedInputCancel}>
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div style={timeDisplayStyle} onClick={handleTimeClick}>
              {formatTime()}
            </div>
          )}
          
          <button style={buttonStyle} onClick={handleIncrease}>
            +
          </button>
        </div>

        <div style={checkboxContainerStyle}>
          <input
            type="checkbox"
            id="showStopwatch"
            checked={showStopwatch}
            onChange={(e) => setShowStopwatch(e.target.checked)}
            style={checkboxStyle}
          />
          <label htmlFor="showStopwatch" style={checkboxLabelStyle}>
            연습 시 스톱워치 보기
          </label>
        </div>

        <button style={completeButtonStyle} onClick={handleComplete}>
          완료
        </button>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: colors.static.white,
  borderRadius: '20px',
  padding: '40px',
  width: '400px',
  textAlign: 'center',
  fontFamily: 'Pretendard, sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 600,
  color: colors.label.normal,
  marginBottom: '8px',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 400,
  color: colors.label.alternative,
  marginBottom: '40px',
};

const timePickerContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '32px',
};

const buttonStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  border: `1px solid ${colors.line.normal}`,
  backgroundColor: colors.static.white,
  color: colors.label.normal,
  fontSize: '20px',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const timeDisplayStyle: React.CSSProperties = {
  backgroundColor: colors.fill.normal,
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '18px',
  fontWeight: 500,
  color: colors.label.normal,
  cursor: 'pointer',
  minWidth: '120px',
};

const detailedInputContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexDirection: 'column',
};

const inputStyle: React.CSSProperties = {
  width: '60px',
  padding: '8px',
  borderRadius: '6px',
  border: `1px solid ${colors.line.normal}`,
  textAlign: 'center',
  fontSize: '16px',
  fontFamily: 'Pretendard, sans-serif',
};

const separatorStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.label.normal,
  fontWeight: 500,
};

const inputButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: '8px',
};

const inputButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: `1px solid ${colors.line.normal}`,
  backgroundColor: colors.static.white,
  color: colors.label.normal,
  fontSize: '14px',
  cursor: 'pointer',
};

const checkboxContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginBottom: '32px',
};

const checkboxStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  accentColor: colors.primary.normal,
};

const checkboxLabelStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.label.normal,
  fontWeight: 500,
  cursor: 'pointer',
};

const completeButtonStyle: React.CSSProperties = {
  width: '100%',
  height: '50px',
  backgroundColor: colors.primary.normal,
  color: colors.static.white,
  border: 'none',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'Pretendard, sans-serif',
};