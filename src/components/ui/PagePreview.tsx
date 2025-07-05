import React from 'react';
import { colors } from '../../theme/colors';

interface PagePreviewProps {
  /** 전체 페이지 수 */
  totalPages: number;
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 미리보기 콘텐츠 렌더링 함수 */
  renderPageContent?: (pageNumber: number) => React.ReactNode;
  /** 페이지 변경 시 호출되는 콜백 */
  onPageChange?: (pageNumber: number) => void;
  /** 제목 */
  title?: string;
  /** 설명 */
  description?: string;
}

export function PagePreview({
  totalPages: _totalPages,
  currentPage,
  renderPageContent,
  onPageChange,
  title = "발표 대본",
  description = "설명을 입력하세요",
}: PagePreviewProps) {
  React.useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  const defaultPageContent = (pageNumber: number) => (
    <div style={defaultPageContentStyle}>
      <div style={pageNumberDisplayStyle}>
        {pageNumber}
      </div>
      <div style={pageTextStyle}>
        페이지 {pageNumber}
      </div>
    </div>
  );

  return (
    <div style={frame222Style}>
      <div style={frame220Style}>
        {/* 헤더 영역 - Frame 232 */}
        <div style={frame232Style}>
          <div style={frame203Style}>
            <div style={frame110Style}>
              <div style={titleStyle}>
                {title}
              </div>
            </div>
          </div>
          <div style={frame212Style}>
            <div style={frame110DescStyle}>
              <div style={descriptionStyle}>
                {description}
              </div>
            </div>
          </div>
        </div>

        {/* 미리보기 영역 - Frame 211 */}
        <div style={frame211Style}>
          <div style={frame35Style}>
            {renderPageContent ? renderPageContent(currentPage) : defaultPageContent(currentPage)}
          </div>
        </div>
      </div>
    </div>
  );
}

// 스타일 정의
const frame222Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',
  width: '350px',
  maxWidth: '350px',
  height: '503px',
  flex: 'none',
  order: 0,
  flexGrow: 1,
};

const frame220Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '20px',
  width: '350px',
  height: '503px',
  flex: 'none',
  order: 0,
  flexGrow: 1,
};

const frame232Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  padding: '0px',
  width: '350px',
  height: '24px',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const frame203Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0px',
  width: '94px',
  height: '24px',
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const frame110Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 10px',
  gap: '10px',
  width: '94px',
  height: '24px',
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const titleStyle: React.CSSProperties = {
  width: '74px',
  height: '24px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  color: '#171719',
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const frame212Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '2px 0px',
  width: '94px',
  height: '20px',
  flex: 'none',
  order: 1,
  flexGrow: 0,
};

const frame110DescStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',
  width: '94px',
  height: '16px',
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const descriptionStyle: React.CSSProperties = {
  width: '94px',
  height: '16px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '16px',
  display: 'flex',
  alignItems: 'center',
  color: '#78787B',
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const frame211Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  gap: '10px',
  width: '340px',
  maxWidth: '340px',
  height: '459px',
  background: '#F1F2F5',
  borderRadius: '12px',
  flex: 'none',
  order: 1,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const frame35Style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '28px',
  width: '320px',
  height: '439px',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
  position: 'relative',
  overflow: 'hidden',
};

const defaultPageContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  height: '100%',
};

const pageNumberDisplayStyle: React.CSSProperties = {
  fontSize: '48px',
  fontWeight: 'bold',
  color: colors.neutral.gray300,
  fontFamily: 'Pretendard, sans-serif',
};

const pageTextStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 500,
  color: colors.neutral.gray500,
  fontFamily: 'Pretendard, sans-serif',
}; 