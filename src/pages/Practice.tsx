import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SimplePdfViewer } from '../components/ui/SimplePdfViewer';
import { TopNavBar } from '../components/ui/TopNavBar';
import { GoalTimeModal } from '../components/ui/GoalTimeModal';
import { ScriptModal } from '../components/ScriptModal';
import { Sidebar, StatusBar, ExitModal } from '../components/practice';
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
  const [showGoalTimeModal, setShowGoalTimeModal] = useState(true);
  const [goalTime, setGoalTime] = useState({ minutes: 0, seconds: 0 });
  const [showStopwatch, setShowStopwatch] = useState(true);
  const [isGoalTimeSet, setIsGoalTimeSet] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  
  // 페이지별 시간 추적
  const [currentPageTime, setCurrentPageTime] = useState({ minutes: 0, seconds: 0 });
  const [pageTimes, setPageTimes] = useState<Record<number, { minutes: number; seconds: number }>>({});

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
      setScriptContent(currentSlideData?.content || '');
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

        // 현재 페이지 시간도 업데이트
        setCurrentPageTime(prev => {
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

  // 페이지 변경 시 또는 타이머 시작 시 시간 추적
  useEffect(() => {
    if (isTimerRunning) {
      // 현재 페이지의 기존 시간을 가져오거나 초기화
      const existingTime = pageTimes[currentSlide];
      setCurrentPageTime(existingTime || { minutes: 0, seconds: 0 });
    }
  }, [currentSlide, isTimerRunning, pageTimes]);



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
    // 현재 페이지 시간을 저장하고 새 페이지로 이동
    if (isTimerRunning) {
      setPageTimes(prev => ({
        ...prev,
        [currentSlide]: currentPageTime
      }));
    }
    setCurrentSlide(slideNumber);
  };


  const toggleTimer = () => {
    if (isTimerRunning) {
      // 타이머 중지 시 현재 페이지 시간을 저장
      setPageTimes(prev => ({
        ...prev,
        [currentSlide]: currentPageTime
      }));
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    // 현재 페이지 시간을 저장
    if (isTimerRunning) {
      setPageTimes(prev => ({
        ...prev,
        [currentSlide]: currentPageTime
      }));
    }
    setIsTimerRunning(false);
    setTimer({ minutes: 0, seconds: 0 });
    setCurrentPageTime({ minutes: 0, seconds: 0 });
    setPageTimes({});
  };

  const handleScriptBlur = () => {
    if (practiceData) {
      const updatedSlides = practiceData.slides.map(slide =>
        slide.slideNumber === currentSlide
          ? { ...slide, content: scriptContent }
          : slide
      );
      setPracticeData({
        ...practiceData,
        slides: updatedSlides
      });
    }
  };

  const handleGoalTimeComplete = (goalMinutes: number, goalSeconds: number, showStopwatchSetting: boolean) => {
    setGoalTime({ minutes: goalMinutes, seconds: goalSeconds });
    setShowStopwatch(showStopwatchSetting);
    setIsPracticing(!showStopwatchSetting);
    setShowGoalTimeModal(false);
    setIsGoalTimeSet(true);
  };

  const handleTimeSettingClick = () => {
    setShowGoalTimeModal(true);
  };

  const handleScriptWritingClick = () => {
    setShowScriptModal(true);
  };

  const handleScriptModalSave = (slides: SlideInput[]) => {
    if (practiceData) {
      setPracticeData({
        ...practiceData,
        slides: slides
      });
    }
    setShowScriptModal(false);
  };

  const handleScriptSlideChange = (slideNumber: number, content: string) => {
    if (practiceData) {
      const updatedSlides = practiceData.slides.map(slide =>
        slide.slideNumber === slideNumber
          ? { ...slide, content }
          : slide
      );
      setPracticeData({
        ...practiceData,
        slides: updatedSlides
      });
    }
  };

  const handlePracticeToggle = () => {
    setIsPracticing(!isPracticing);
  };

  const handleStopwatchToggle = (showStopwatch: boolean) => {
    // 스톱워치 보기 옵션과 연동
    // showStopwatch가 false면 스톱워치를 숨기고 "연습 중" 표시
    setShowStopwatch(showStopwatch);
    setIsPracticing(!showStopwatch);
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate('/', { replace: true });
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
          pdfFile={pdfFile}
          onSlideClick={handleSlideClick}
          onFileNameChange={setFileName}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
          isPracticing={isPracticing}
          onPracticeToggle={handlePracticeToggle}
          onExitClick={handleExitClick}
        />

        {/* 메인 영역 */}
        <div style={mainAreaStyle}>
          {/* 상단 상태바 */}
          <StatusBar
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            currentPageTime={currentPageTime}
            isTimerRunning={isTimerRunning}
            onTimeSettingClick={handleTimeSettingClick}
            onScriptWritingClick={handleScriptWritingClick}
          />

          {/* 콘텐츠 영역 */}
          <div style={contentAreaStyle}>
            {/* PDF 뷰어 */}
            <div style={pdfViewerContainerStyle}>
              <SimplePdfViewer 
                file={pdfFile} 
                currentPage={currentSlide}
              />
              
              {/* 목표 시간 설정 모달 - PDF 뷰어 내부에서 오버레이 */}
              {showGoalTimeModal && (
                <div style={pdfOverlayStyle}>
                  <GoalTimeModal
                    isOpen={showGoalTimeModal}
                    onComplete={handleGoalTimeComplete}
                    onStopwatchToggle={handleStopwatchToggle}
                    embedded={true}
                    initialMinutes={isGoalTimeSet ? goalTime.minutes : 10}
                    initialSeconds={isGoalTimeSet ? goalTime.seconds : 30}
                    initialStopwatchSetting={showStopwatch}
                  />
                </div>
              )}
            </div>

            {/* 대본 입력 영역 */}
            <div style={scriptInputContainerStyle}>
              <textarea 
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                onBlur={handleScriptBlur}
                placeholder="해당 슬라이드의 대본을 입력하세요."
                style={textareaStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 대본 작성 모달 */}
      {showScriptModal && practiceData && (
        <ScriptModal
          isOpen={showScriptModal}
          onClose={() => setShowScriptModal(false)}
          pdfFile={practiceData.pdfFile}
          slides={practiceData.slides}
          onSave={handleScriptModalSave}
          onSlideChange={handleScriptSlideChange}
        />
      )}

      {/* 종료 모달 */}
      <ExitModal
        isOpen={showExitModal}
        onCancel={handleExitCancel}
        onConfirm={handleExitConfirm}
      />
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
  position: 'relative',
};

// PDF 뷰어 내부 오버레이
const pdfOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(71, 69, 69, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  borderRadius: '12px',
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

