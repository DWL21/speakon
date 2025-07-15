import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PracticeResult } from '../components/ResultReport';
import { TopNavBar } from '../components/ui/TopNavBar';
import { SimplePdfViewer } from '../components/ui/SimplePdfViewer';
import { ResultReportSlideCard } from '../components/ResultReport/ResultReportSlideCard';
import { Button } from '../components/ui/Button';
import { File } from 'lucide-react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const practiceResult = location.state as PracticeResult;

  if (!practiceResult) {
    return (
      <div style={errorContainerStyle}>
        <div style={errorTextStyle}>결과 데이터를 찾을 수 없습니다.</div>
        <button 
          style={homeButtonStyle}
          onClick={() => navigate('/', { replace: true })}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleRetry = () => {
    navigate('/practice', { 
      state: {
        pdfFile: practiceResult.pdfFile,
        slides: practiceResult.slides
      },
      replace: true 
    });
  };

  const calculatePercentage = (pageTime: { minutes: number; seconds: number }) => {
    const totalSeconds = practiceResult.totalTime.minutes * 60 + practiceResult.totalTime.seconds;
    const pageSeconds = pageTime.minutes * 60 + pageTime.seconds;
    
    if (totalSeconds === 0) return 0;
    return Math.round((pageSeconds / totalSeconds) * 100);
  };

  const formatTime = (time: { minutes: number; seconds: number }) => {
    return `${time.minutes.toString().padStart(2, '0')}분 ${time.seconds.toString().padStart(2, '0')}초`;
  };

  return (
    <div style={containerStyle}>
      <TopNavBar />
      <div style={pageContentStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <span style={titleStyle}>총 소요시간</span>
            <span style={timeStyle}>{formatTime(practiceResult.totalTime)}</span>
          </div>
        </div>
        
        <div style={mainContentStyle}>
          <div style={pdfViewerStyle}>
            <SimplePdfViewer 
              file={practiceResult.pdfFile} 
              currentPage={currentPage}
            />
          </div>
          <div style={slideListStyle}>
            <div style={slideListInnerStyle}>
              <div style={slideCardsContainerStyle}>
                {practiceResult.slides.map((slide) => {
                  const pageTime = practiceResult.pageTimes[slide.slideNumber] || { minutes: 0, seconds: 0 };
                  const percentage = calculatePercentage(pageTime);
                  
                  return (
                    <ResultReportSlideCard
                      key={slide.slideNumber}
                      slideNumber={slide.slideNumber}
                      content={slide.content}
                      timeText={`${formatTime(pageTime)} 소요`}
                      percentageText={`전체 소요 시간의 ${percentage}%`}
                      percentage={percentage}
                      onSlideClick={() => setCurrentPage(slide.slideNumber)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div style={footerStyle}>
          <div style={footerContentStyle}>
            <button style={homeButtonStyle} onClick={handleGoHome}>
              <File size={16} color="#525c6b" />
              <span style={homeButtonTextStyle}>처음으로</span>
            </button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleRetry}
              style={retryButtonStyle}
            >
              다시 연습
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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

const pageContentStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 60px)',
  backgroundColor: colors.background.normal,
};

const headerStyle: React.CSSProperties = {
  width: '100%',
  padding: '35px 50px 35px 50px',
};

const headerContentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '20px 0',
  paddingLeft: '15px',
};

const titleStyle: React.CSSProperties = {
  ...typography.title[2],
  color: colors.label.normal,
  fontWeight: 600,
  fontSize: '20px',
};

const timeStyle: React.CSSProperties = {
  ...typography.title[2],
  color: colors.label.normal,
  fontWeight: 600,
  fontSize: '20px',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 20px',
  display: 'flex',
  gap: '18px',
  minHeight: 0,
};

const pdfViewerStyle: React.CSSProperties = {
  width: '500px',
  flexShrink: 0,
  backgroundColor: colors.fill.normal,
  borderRadius: '12px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '500px',
};

const slideListStyle: React.CSSProperties = {
  flex: 1,
  borderTopLeftRadius: '20px',
  borderBottomLeftRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
  minWidth: 0,
};

const slideListInnerStyle: React.CSSProperties = {
  display: 'flex',
  height: '100%',
  position: 'relative',
};

const slideCardsContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: '27px 10px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingRight: '13px',
};


const footerStyle: React.CSSProperties = {
  padding: '0 60px',
  height: '95px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
};

const footerContentStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
};

const homeButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  padding: '7px 0',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  ...typography.body.reading,
};

const homeButtonTextStyle: React.CSSProperties = {
  color: '#525c6b',
  fontSize: '14px',
  fontWeight: 500,
};

const retryButtonStyle: React.CSSProperties = {
  width: '110px',
  color: '#FFF',
  fontFamily: 'Pretendard',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: 'normal',
};

const errorContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: colors.background.normal,
  gap: '20px',
};

const errorTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};