import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PracticeResult } from '../components/ResultReport';
import { TopNavBar } from '../components/ui/TopNavBar';
import { Button } from '../components/ui/Button';
import { colors } from '../theme/colors';

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  // 페이지 이동 상태(현재 미사용)
  const [isScriptCardFlipped, setIsScriptCardFlipped] = React.useState(false);

  const practiceResult = location.state as PracticeResult;

  if (!practiceResult) {
    return (
      <div style={errorContainerStyle}>
        <div style={errorTextStyle}>결과 데이터를 찾을 수 없습니다.</div>
        <button 
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/', { replace: true })}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // const handleGoHome = () => {
  //   navigate('/', { replace: true });
  // };

  const handleRetry = () => {
    navigate('/practice', { 
      state: {
        pdfFile: practiceResult.pdfFile,
        slides: practiceResult.slides
      },
      replace: true 
    });
  };

  const formatTime = (time: { minutes: number; seconds: number }) => {
    return `${time.minutes.toString().padStart(2, '0')}분 ${time.seconds.toString().padStart(2, '0')}초`;
  };

  const totalSec = practiceResult.totalTime.minutes * 60 + practiceResult.totalTime.seconds;

  const goalSeconds = (practiceResult as any).goalTime
    ? (practiceResult as any).goalTime.minutes * 60 + (practiceResult as any).goalTime.seconds
    : undefined;

  // Mock 예상 질문 TOP5 (MCP 뷰 유지)
  const mockQuestions: string[] = [
    '질문 1을 입력하시면 됩니다',
    '질문 2을 입력하시면 됩니다',
    '질문 3을 입력하시면 됩니다',
    '질문 4을 입력하시면 됩니다',
    '질문 5을 입력하시면 됩니다',
  ];

  const diffSec = goalSeconds !== undefined ? totalSec - goalSeconds : undefined;
  const headline = '당신은 완벽한 설계자예요. 계획한 시간 안에서 멋지게 발표를 마쳤네요!';
  const isUnderGoal = goalSeconds !== undefined ? totalSec < goalSeconds : false;

  const longestSlideNumber: number | undefined = (() => {
    const entries = Object.entries(practiceResult.pageTimes);
    if (entries.length === 0) return undefined;
    const sorted = entries
      .map(([num, t]) => ({ num: Number(num), sec: t.minutes * 60 + t.seconds }))
      .sort((a, b) => b.sec - a.sec);
    return sorted[0]?.num;
  })();

  const longestSlide = longestSlideNumber
    ? practiceResult.slides.find(s => s.slideNumber === longestSlideNumber)
    : undefined;
  const longestScript = longestSlide?.content ?? '';

  return (
    <div style={containerStyle}>
      <TopNavBar />
      <div style={pageContentStyle}>
        {/* 제목 바 */}
        <div style={reportTitleRowStyle}>
          <span style={reportTitleTextStyle}>발표 보고서</span>
        </div>
        {/* 요약 섹션 (피그마 MCP) */}
        <div style={summarySectionStyle}>
          <div style={summaryIntroStyle}>발표 연습 데이터를 살펴본 결과</div>
          <div style={summaryHeadlineStyle}>{headline}</div>
          <div style={summaryCardsRowStyle}>
            {/* 발표 시간 */}
            <div style={summaryCardStyle}>
              <div style={summaryCardTitleStyle}>발표 시간</div>
              <div style={summaryCardValueGroupStyle}>
                <div style={summaryBigValueStyle}>{formatTime(practiceResult.totalTime)}</div>
                <div style={summarySubTextStyle}>발표를 진행했어요</div>
              </div>
            </div>
            {/* 목표 시간 대비 */}
            <div style={summaryCardStyle}>
              <div style={summaryCardTitleStyle}>목표 시간 대비</div>
              <div style={summaryCardValueRowStyle}>
                <div style={{
                  ...attentionIconBoxStyle,
                  backgroundColor: isUnderGoal ? '#22C55E' : '#ff5274',
                }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#FFFFFF" strokeWidth="1" />
                    <rect x="8" y="10.5" width="0.01" height="0.01" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M8 8V5.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div style={summaryBigValueStyle}>
                    {goalSeconds !== undefined ? (() => {
                      const diff = totalSec - goalSeconds;
                      const sign = diff >= 0 ? '+' : '-';
                      const abs = Math.abs(diff);
                      const m = Math.floor(abs / 60);
                      const s = abs % 60;
                      return `${sign}${m}분 ${s.toString().padStart(2, '0')}초`;
                    })() : '—'}
                  </div>
                  <div style={summarySubTextStyle}>
                    {diffSec === undefined
                      ? '목표 시간이 설정되지 않았어요'
                      : (totalSec < (goalSeconds as number))
                        ? '시간 조절이 휼륭했어요'
                        : diffSec > 0
                          ? '더 초과됐어요'
                          : '목표 시간 안에 끝냈어요'}
                  </div>
                </div>
              </div>
            </div>
            {/* 가장 오래 발표한 슬라이드 - 카드 클릭 시 대본 보기 (뒤집기) */}
            <div
              style={{ ...summaryCardStyle, width: '550px', cursor: longestSlideNumber ? 'pointer' : 'default' }}
              onClick={() => {
                if (longestSlideNumber) setIsScriptCardFlipped(prev => !prev);
              }}
              title={longestSlideNumber ? '카드를 클릭하면 대본을 확인/닫을 수 있어요' : undefined}
              aria-label="가장 오래 발표한 슬라이드 카드"
            >
              <div style={summaryCardTitleStyle}>이 슬라이드에 시간을 가장 많이 썼어요!</div>
              {longestSlideNumber ? (
                isScriptCardFlipped ? (
                  <div style={flipBackStyle}>
                    <div style={scriptBoxStyle}>
                      <pre style={scriptTextStyle}>{longestScript || '대본이 없습니다.'}</pre>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={summaryBigValueStyle}>슬라이드 {longestSlideNumber}</div>
                    <div style={summarySubTextStyle}>카드를 클릭하면 대본을 확인할 수 있어요</div>
                  </div>
                )
              ) : (
                <div style={emptyTextStyle}>데이터 없음</div>
              )}
            </div>
          </div>
        </div>
        {/* 인사이트 (시간 추이 + 질문 TOP5) - MCP 뷰 유지 */}
        <div style={insightRowStyle}>
          <div style={insightLeftStyle}>
            <div style={insightTextGroupStyle}>
              <div style={insightIntroStyle}>슬라이드마다 시간을 어떻게 썼는지 한눈에 보여드릴게요</div>
              <div style={insightTitleStyle}>슬라이드별 발표 시간 추이</div>
            </div>
            <div style={trendBarRowStyle}>
              {practiceResult.slides.map((slide, idx) => {
                const t = practiceResult.pageTimes[slide.slideNumber] || { minutes: 0, seconds: 0 };
                const sec = t.minutes * 60 + t.seconds;
                const maxSec = Math.max(1, ...Object.values(practiceResult.pageTimes).map(v => v.minutes * 60 + v.seconds));
                const h = Math.max(24, Math.round((sec / maxSec) * 180));
                const ratio = sec / maxSec;
                const color = ratio > 0.75 ? '#3282ff' : ratio > 0.5 ? '#84b4ff' : '#ccdfff';
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px' }}>
                    <div style={{ width: '40px', height: `${h}px`, borderRadius: '12px', backgroundColor: color }} />
                    <div style={{ fontSize: '13px', color: colors.label.normal, textAlign: 'center', width: '40px' }}>{slide.slideNumber}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={insightRightStyle}>
            <div style={insightRightHeaderStyle}>
              <div style={insightIntroStyle}>이런 질문이 나올 수 있어요!</div>
              <div style={insightTitleStyle}>예상 질문 TOP5</div>
            </div>
            <div style={questionCardStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                {mockQuestions.map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={numberBadgeStyle}>{i + 1}</div>
                    <span style={{ fontSize: '16px', color: colors.label.normal, fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={questionActionRowStyle}>
              <Button
                variant="primary"
                size="medium"
                onClick={handleRetry}
                style={retryButtonStyle}
              >
                다시 연습하기
              </Button>
            </div>
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

// 제목 바 스타일 (피그마: 좌측 여백 124px, 20px 세미볼드)
const reportTitleRowStyle: React.CSSProperties = {
  width: '100%',
  padding: '40px 0 0 124px',
};

const reportTitleTextStyle: React.CSSProperties = {
  fontFamily: 'Pretendard, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#171719',
};

const summarySectionStyle: React.CSSProperties = {
  width: '100%',
  padding: '35px 50px 20px 50px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const summaryIntroStyle: React.CSSProperties = {
  fontFamily: 'Pretendard, sans-serif',
  fontSize: '14px',
  color: '#7d7e83',
  paddingLeft: '78px',
};

const summaryHeadlineStyle: React.CSSProperties = {
  fontFamily: 'Pretendard, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  color: '#171719',
  paddingLeft: '78px',
};

const summaryCardsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const summaryCardStyle: React.CSSProperties = {
  backgroundColor: colors.static.white,
  borderRadius: '24px',
  border: `1px solid ${colors.fill.neutral}`,
  width: '299px',
  height: '180px',
  padding: '30px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
};

const summaryCardTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.label.normal,
  fontWeight: 500,
};

const summaryCardValueGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const summaryCardValueRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
};

const attentionIconBoxStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  borderRadius: '8px',
  backgroundColor: '#ff5274',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const summaryBigValueStyle: React.CSSProperties = {
  fontSize: '24px',
  color: colors.label.normal,
  fontWeight: 600,
  letterSpacing: '-0.48px',
};

const summarySubTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#78787b',
};

// 카드 뒤집기(대본 보기) 뒷면 스타일
const flipBackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

// const flipBackHeaderStyle: React.CSSProperties = {
//   fontSize: '14px',
//   color: colors.label.normal,
//   fontWeight: 500,
// };

const scriptBoxStyle: React.CSSProperties = {
  backgroundColor: colors.fill?.normal || '#F4F6F8',
  borderRadius: '12px',
  padding: '16px 18px',
  height: '140px',
  width: '100%',
  overflowY: 'auto',
  boxSizing: 'border-box',
};

const scriptTextStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'Pretendard, sans-serif',
  fontSize: '13px',
  color: colors.label.normal,
  whiteSpace: 'pre-wrap',
  lineHeight: 1.5,
};

// const flipHintStyle: React.CSSProperties = {
//   fontSize: '12px',
//   color: colors.label.neutral,
// };

const insightRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '32px',
  alignItems: 'stretch',
  justifyContent: 'center',
  padding: '0 70px',
};

const insightLeftStyle: React.CSSProperties = {
  width: '550px',
  display: 'flex',
  flexDirection: 'column',
  gap: '49px',
  paddingTop: '16px',
};

// 텍스트 두 줄 간격 4px (Figma)
const insightTextGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const insightIntroStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#7d7e83',
};

const insightTitleStyle: React.CSSProperties = {
  fontSize: '22px',
  color: '#171719',
  fontWeight: 600,
};

const trendBarRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-end',
  padding: '0 20px',
  height: '225px',
  maxWidth: '640px',
  width: '100%',
};

const insightRightStyle: React.CSSProperties = {
  width: '580px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  paddingTop: '30px',
};

const insightRightHeaderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingLeft: '21px',
};

const questionCardStyle: React.CSSProperties = {
  backgroundColor: colors.static.white,
  borderRadius: '24px',
  border: `1px solid ${colors.fill.neutral}`,
  padding: '24px 28px',
  height: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const numberBadgeStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  borderRadius: '9px',
  backgroundColor: colors.primary.normal,
  color: colors.static.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 700,
};


const questionActionRowStyle: React.CSSProperties = {
  padding: '10px 21px 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
};

const retryButtonStyle: React.CSSProperties = {
  width: '160px',
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

// Insights section styles
// const insightSectionStyle: React.CSSProperties = {
//   padding: '0 50px 40px 50px',
// };

// const insightGridStyle: React.CSSProperties = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
//   gap: '16px',
// };

// const cardStyle: React.CSSProperties = {
//   backgroundColor: colors.background.normal,
//   border: `1px solid ${colors.fill.neutral}`,
//   borderRadius: '12px',
//   padding: '16px',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '10px',
// };

// const cardTitleStyle: React.CSSProperties = {
//   fontSize: '14px',
//   color: colors.label.normal,
//   fontWeight: 600,
// };

// const metricRowStyle: React.CSSProperties = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   fontSize: '13px',
//   color: colors.label.normal,
// };

// const metricLabelStyle: React.CSSProperties = {
//   color: colors.label.neutral,
// };

// const metricValueStyle: React.CSSProperties = {
//   fontWeight: 600,
// };

const emptyTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: colors.label.neutral,
};

// const chipRowStyle: React.CSSProperties = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// };

// const chipStyle: React.CSSProperties = {
//   fontSize: '12px',
//   color: colors.label.normal,
//   backgroundColor: colors.fill.normal,
//   borderRadius: '8px',
//   padding: '4px 8px',
// };

// const chipValueStyle: React.CSSProperties = {
//   fontSize: '12px',
//   color: colors.label.normal,
// };

// const trendContainerStyle: React.CSSProperties = {
//   display: 'flex',
//   alignItems: 'flex-end',
//   gap: '10px',
//   paddingTop: '6px',
// };

// const badgeStyle: React.CSSProperties = {
//   width: '18px',
//   height: '18px',
//   borderRadius: '9px',
//   backgroundColor: colors.primary.normal,
//   color: colors.static.white,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '11px',
//   fontWeight: 700,
// };