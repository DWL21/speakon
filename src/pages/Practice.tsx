import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimplePdfViewer } from '../components/ui/SimplePdfViewer';
import { TopNavBar } from '../components/ui/TopNavBar';
import { colors } from '../theme/colors';
import { SlideInput } from '../components/ScriptModal/ScriptModalForm';

interface PracticePageState {
  pdfFile: File;
  slides: SlideInput[];
}

export function Practice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [practiceData, setPracticeData] = useState<PracticePageState | null>(null);
  const [fileName, setFileName] = useState('파일명을 입력하세요');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [scriptContent, setScriptContent] = useState('');

  useEffect(() => {
    const state = location.state as PracticePageState;
    if (!state || !state.pdfFile || !state.slides) {
      navigate('/', { replace: true });
      return;
    }
    setPracticeData(state);
    setFileName(state.pdfFile.name.replace('.pdf', ''));
  }, [location.state, navigate]);

  useEffect(() => {
    if (practiceData) {
      const currentSlideData = practiceData.slides.find(slide => slide.slideNumber === currentSlide);
      setScriptContent(currentSlideData?.content || '해당 슬라이드의 대본을 입력하세요.');
    }
  }, [currentSlide, practiceData]);

  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimer(prev => {
          const newSeconds = prev.seconds + 1;
          if (newSeconds >= 60) {
            return { minutes: prev.minutes + 1, seconds: 0 };
          }
          return { ...prev, seconds: newSeconds };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!practiceData) {
    return (
      <div style={loadingContainerStyle}>
        <div style={loadingTextStyle}>연습 페이지를 준비하는 중...</div>
      </div>
    );
  }

  const { pdfFile, slides } = practiceData;
  const totalSlides = slides.length;

  const handleSlideClick = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
  };


  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer({ minutes: 0, seconds: 0 });
  };

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div style={containerStyle}>
      {/* TopNavBar 사용 */}
      <TopNavBar />
      
      {/* 메인 콘텐츠 */}
      <div style={mainContentStyle}>
        {/* 왼쪽 사이드바 */}
        <div style={sidebarStyle}>
          {/* 슬라이드 리스트 */}
          <div style={slideListStyle}>
            {slides.map((slide) => (
              <div 
                key={slide.slideNumber}
                style={{
                  ...slideCardStyle,
                  backgroundColor: currentSlide === slide.slideNumber ? colors.primary.normal : colors.background.normal
                }}
                onClick={() => handleSlideClick(slide.slideNumber)}
              >
                <div style={slideNumberStyle}>
                  {slide.slideNumber}
                </div>
                <div style={slidePreviewStyle}>
                  {/* 슬라이드 미리보기 썸네일 */}
                </div>
              </div>
            ))}
          </div>

          {/* 파일명 + 타이머 컨트롤 */}
          <div style={controlPanelStyle}>
            <input 
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              style={fileNameInputStyle}
            />
            
            <div style={timerControlStyle}>
              <div style={timerDisplayStyle}>
                <span>{formatTime(timer.minutes)}</span>
                <span>:</span>
                <span>{formatTime(timer.seconds)}</span>
              </div>
              
              <div style={timerButtonsStyle}>
                <button 
                  onClick={toggleTimer}
                  style={{...timerButtonStyle, backgroundColor: colors.primary.normal}}
                >
                  {isTimerRunning ? '일시정지' : '재생'}
                </button>
                <button 
                  onClick={resetTimer}
                  style={{...timerButtonStyle, backgroundColor: 'transparent', color: colors.primary.normal}}
                >
                  종료
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 영역 */}
        <div style={mainAreaStyle}>
          {/* 상단 상태바 */}
          <div style={statusBarStyle}>
            <div style={emptySpaceStyle}></div>
            
            <div style={pageIndicatorStyle}>
              <span>{currentSlide}</span>
              <span>/</span>
              <span>{totalSlides}</span>
            </div>
            
            <div style={actionButtonsStyle}>
              <div style={actionButtonStyle}>
                🕐 시간 설정
              </div>
              <div style={actionButtonStyle}>
                ✏️ 대본 작성
              </div>
            </div>
          </div>

          {/* PDF 뷰어 */}
          <div style={pdfViewerStyle}>
            <SimplePdfViewer 
              file={pdfFile} 
              currentPage={currentSlide}
            />
          </div>

          {/* 대본 입력 영역 */}
          <div style={scriptInputStyle}>
            <textarea 
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              placeholder="해당 슬라이드의 대본을 입력하세요."
              style={textareaStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 스타일 정의
const containerStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundColor: colors.background.normal,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Pretendard, sans-serif',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
};

const loadingContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: colors.background.normal,
};

const loadingTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};

// 메인 콘텐츠 스타일
const mainContentStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
};

const sidebarStyle: React.CSSProperties = {
  width: '293px',
  backgroundColor: colors.background.normal,
  borderRight: `1px solid ${colors.line.normal}`,
  display: 'flex',
  flexDirection: 'column',
};

const slideListStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  borderBottom: `1px solid ${colors.line.normal}`,
};

const slideCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 20px',
  gap: '4px',
  cursor: 'pointer',
  borderBottom: `1px solid ${colors.line.normal}`,
  transition: 'background-color 0.2s',
};

const slideNumberStyle: React.CSSProperties = {
  fontSize: '13px',
  color: colors.label.alternative,
  minWidth: '20px',
  fontFamily: 'Pretendard, sans-serif',
};

const slidePreviewStyle: React.CSSProperties = {
  flex: 1,
  height: '135px',
  backgroundColor: colors.fill.normal,
  borderRadius: '12px',
  border: `1px solid ${colors.line.normal}`,
};

const controlPanelStyle: React.CSSProperties = {
  padding: '16px',
  backgroundColor: colors.background.normal,
  borderTop: `1px solid ${colors.line.normal}`,
};

const fileNameInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  fontSize: '13px',
  color: colors.label.normal,
  fontFamily: 'Pretendard, sans-serif',
  marginBottom: '12px',
  backgroundColor: 'transparent',
  outline: 'none',
};

const timerControlStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const timerDisplayStyle: React.CSSProperties = {
  backgroundColor: colors.fill.normal,
  borderRadius: '8px',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '18px',
  fontWeight: 500,
  color: colors.label.normal,
  fontFamily: 'Pretendard, sans-serif',
  minWidth: '135px',
  justifyContent: 'center',
};

const timerButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0',
};

const timerButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '8px',
  padding: '7px 15px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: 'Pretendard, sans-serif',
  color: colors.static.white,
};

// 메인 영역 스타일
const mainAreaStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.background.normal,
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

const pdfViewerStyle: React.CSSProperties = {
  backgroundColor: colors.fill.normal,
  borderRadius: '12px',
  margin: '20px 45px',
  height: '614px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const scriptInputStyle: React.CSSProperties = {
  margin: '0 45px 20px 45px',
  maxWidth: '1060px',
  width: 'calc(100% - 90px)',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '185px',
  backgroundColor: colors.fill.normal,
  border: 'none',
  borderRadius: '15px',
  padding: '35px 40px',
  fontSize: '16px',
  fontWeight: 500,
  color: colors.label.normal,
  fontFamily: 'Pretendard, sans-serif',
  resize: 'none',
  outline: 'none',
  boxSizing: 'border-box',
};

