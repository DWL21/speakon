import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PracticeResult } from '../components/ResultReport';
import { TopNavBar } from '../components/ui/TopNavBar';
import { Button } from '../components/ui/Button';
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

  const totalSec = practiceResult.totalTime.minutes * 60 + practiceResult.totalTime.seconds;

  const goalSeconds = (practiceResult as any).goalTime
    ? (practiceResult as any).goalTime.minutes * 60 + (practiceResult as any).goalTime.seconds
    : undefined;

  // Mock 예상 질문 TOP5
  const mockQuestions: { question: string; reason: string }[] = [
    { question: 'Q1. 핵심 용어의 정의를 더 자세히 설명해 주세요.', reason: '용어 설명이 간략함' },
    { question: 'Q2. 대안 비교 기준은 무엇인가요?', reason: '비교 근거 부족' },
    { question: 'Q3. 성능 수치의 측정 조건은 동일했나요?', reason: '측정 신뢰성' },
    { question: 'Q4. 실패 사례에서 재현 절차는 어떻게 되나요?', reason: '재현성 확인' },
    { question: 'Q5. 추후 일정과 리스크 대응 계획은 무엇인가요?', reason: '로드맵 보완' },
  ];

  const diffSec = goalSeconds !== undefined ? totalSec - goalSeconds : undefined;
  const headline = '휼룽했어요';
  const isUnderGoal = goalSeconds !== undefined ? totalSec < goalSeconds : false;

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
                        ? '시간 조절이 휼륭했어요!'
                        : diffSec > 0
                          ? '더 초과됐어요'
                          : '목표 시간 안에 끝냈어요'}
                  </div>
                </div>
              </div>
            </div>
            {/* 가장 오래 발표한 슬라이드 */}
            <div style={{ ...summaryCardStyle, width: '550px' }}>
              <div style={summaryCardTitleStyle}>이 슬라이드에 시간을 가장 많이 썼어요!</div>
              {(() => {
                const entries = Object.entries(practiceResult.pageTimes);
                if (entries.length === 0) return <div style={emptyTextStyle}>데이터 없음</div>;
                const sorted = entries
                  .map(([num, t]) => ({ num: Number(num), sec: t.minutes * 60 + t.seconds }))
                  .sort((a, b) => b.sec - a.sec);
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={summaryBigValueStyle}>슬라이드 {sorted[0].num}</div>
                    <div style={summarySubTextStyle}>카드를 클릭하면 대본을 확인할 수 있어요</div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* 중단 인사이트 (시간 추이 + 질문 TOP5) */}
        <div style={insightRowStyle}>
          <div style={insightLeftStyle}>
            <div style={insightIntroStyle}>슬라이드마다 시간을 어떻게 썼는지 한눈에 보여드릴게요</div>
            <div style={insightTitleStyle}>슬라이드별 발표 시간 추이</div>
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
                {mockQuestions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={numberBadgeStyle}>{i + 1}</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '16px', color: colors.label.normal, fontWeight: 500 }}>{q.question}</span>
                      <span style={{ fontSize: '14px', color: colors.label.neutral }}>{q.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 목표 시간 대비, 많이 쓴 슬라이드, 슬라이드별 발표 시간 추이, 예상 질문 TOP5 */}
        <div style={insightSectionStyle}>
          <div style={insightGridStyle}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>발표 시간</div>
              <div style={metricRowStyle}>
                <span style={metricLabelStyle}>총 소요</span>
                <span style={metricValueStyle}>{formatTime(practiceResult.totalTime)}</span>
              </div>
              {goalSeconds !== undefined && (
                <div style={metricRowStyle}>
                  <span style={metricLabelStyle}>목표 시간 대비</span>
                  <span style={metricValueStyle}>
                    {(() => {
                      const totalSec = practiceResult.totalTime.minutes * 60 + practiceResult.totalTime.seconds;
                      const diff = totalSec - goalSeconds;
                      const sign = diff >= 0 ? '+' : '-';
                      const abs = Math.abs(diff);
                      const m = Math.floor(abs / 60);
                      const s = abs % 60;
                      return `${sign}${m}분 ${s.toString().padStart(2, '0')}초`;
                    })()}
                  </span>
                </div>
              )}
            </div>

            <div style={cardStyle}>
              <div style={cardTitleStyle}>이 슬라이드에 시간을 많이 썼어요!</div>
              {(() => {
                const entries = Object.entries(practiceResult.pageTimes);
                if (entries.length === 0) return <div style={emptyTextStyle}>데이터 없음</div>;
                const sorted = entries
                  .map(([num, t]) => ({ num: Number(num), sec: t.minutes * 60 + t.seconds }))
                  .sort((a, b) => b.sec - a.sec)
                  .slice(0, 3);
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {sorted.map(({ num, sec }) => (
                      <div key={num} style={chipRowStyle}>
                        <span style={chipStyle}>슬라이드 {num}</span>
                        <span style={chipValueStyle}>{`${Math.floor(sec / 60)}분 ${(sec % 60).toString().padStart(2, '0')}초`}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div style={cardStyle}>
              <div style={cardTitleStyle}>슬라이드별 발표 시간 추이</div>
              <div style={trendContainerStyle}>
                {practiceResult.slides.map(slide => {
                  const t = practiceResult.pageTimes[slide.slideNumber] || { minutes: 0, seconds: 0 };
                  const sec = t.minutes * 60 + t.seconds;
                  const maxSec = Math.max(1, ...Object.values(practiceResult.pageTimes).map(v => v.minutes * 60 + v.seconds));
                  const h = Math.max(4, Math.round((sec / maxSec) * 40));
                  const hue = 210 - Math.round((sec / maxSec) * 150); // 파랑→주황 그라데이션 느낌
                  return (
                    <div key={slide.slideNumber} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '10px', height: `${h}px`, borderRadius: '6px', backgroundColor: `hsl(${hue} 90% 55%)` }} />
                      <span style={{ fontSize: '10px', color: colors.label.neutral }}>#{slide.slideNumber}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitleStyle}>예상 질문 TOP5</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockQuestions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={badgeStyle}>{i + 1}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '13px', color: colors.label.normal, fontWeight: 600 }}>{q.question}</span>
                      <span style={{ fontSize: '12px', color: colors.label.neutral }}>{q.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={footerBarStyle}>
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
  gap: '16px',
  paddingTop: '16px',
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


const footerBarStyle: React.CSSProperties = {
  padding: '0 0 0 140px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
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

// Insights section styles
const insightSectionStyle: React.CSSProperties = {
  padding: '0 50px 40px 50px',
};

const insightGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '16px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  border: `1px solid ${colors.fill.neutral}`,
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.label.normal,
  fontWeight: 600,
};

const metricRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '13px',
  color: colors.label.normal,
};

const metricLabelStyle: React.CSSProperties = {
  color: colors.label.neutral,
};

const metricValueStyle: React.CSSProperties = {
  fontWeight: 600,
};

const emptyTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: colors.label.neutral,
};

const chipRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const chipStyle: React.CSSProperties = {
  fontSize: '12px',
  color: colors.label.normal,
  backgroundColor: colors.fill.normal,
  borderRadius: '8px',
  padding: '4px 8px',
};

const chipValueStyle: React.CSSProperties = {
  fontSize: '12px',
  color: colors.label.normal,
};

const trendContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '10px',
  paddingTop: '6px',
};

const badgeStyle: React.CSSProperties = {
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