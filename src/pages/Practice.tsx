import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimplePdfViewer } from '../components/ui/SimplePdfViewer';
import { TopNavBar } from '../components/ui/TopNavBar';
import { Sidebar, StatusBar } from '../components/practice';
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


  return (
    <div style={containerStyle}>
      {/* TopNavBar 사용 */}
      <TopNavBar />
      
      {/* 메인 콘텐츠 */}
      <div style={mainContentStyle}>
        {/* 왼쪽 사이드바 */}
        <Sidebar
          slides={slides}
          currentSlide={currentSlide}
          fileName={fileName}
          timer={timer}
          isTimerRunning={isTimerRunning}
          onSlideClick={handleSlideClick}
          onFileNameChange={setFileName}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
        />

        {/* 메인 영역 */}
        <div style={mainAreaStyle}>
          {/* 상단 상태바 */}
          <StatusBar
            currentSlide={currentSlide}
            totalSlides={totalSlides}
          />

          {/* 콘텐츠 영역 */}
          <div style={contentAreaStyle}>
            {/* PDF 뷰어 */}
            <div style={pdfViewerContainerStyle}>
              <SimplePdfViewer 
                file={pdfFile} 
                currentPage={currentSlide}
              />
            </div>

            {/* 대본 입력 영역 */}
            <div style={scriptInputContainerStyle}>
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
    </div>
  );
}

// 스타일 정의 - 피그마 디자인에 정확히 맞춤
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
  height: 'calc(100vh - 60px)', // TopNavBar 높이 제외
  overflow: 'hidden',
};

// 메인 영역 스타일
const mainAreaStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.background.normal,
  borderLeft: `1px solid ${colors.line.normal}`,
  height: '100%',
};

// 콘텐츠 영역 (PDF + 대본)
const contentAreaStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '0 45px',
  gap: '16px',
  overflow: 'hidden',
};

// PDF 뷰어 컨테이너
const pdfViewerContainerStyle: React.CSSProperties = {
  backgroundColor: colors.fill.normal,
  borderRadius: '12px',
  height: '614px',
  marginTop: '20px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// 대본 입력 컨테이너
const scriptInputContainerStyle: React.CSSProperties = {
  flex: 'none',
  marginBottom: '20px',
};

// 대본 텍스트에어리어
const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '185px',
  maxHeight: '185px',
  minHeight: '110px',
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
  lineHeight: 1.5,
};

