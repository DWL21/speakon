import React from 'react';
import { PagePreview } from '../components/ui/PagePreview';
import { PageNavigator } from '../components/ui/PageNavigator';
import { usePageNumber } from '../hooks/usePageNumber';
import { colors } from '../theme/colors';

export function PagePreviewExample() {
  const {
    currentPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    goToPage,
  } = usePageNumber({ totalPages: 10, initialPage: 1 });

  const {
    currentPage: customCurrentPage,
    nextPage: customNextPage,
    previousPage: customPreviousPage,
    canGoNext: customCanGoNext,
    canGoPrevious: customCanGoPrevious,
    goToPage: customGoToPage,
  } = usePageNumber({ totalPages: 5, initialPage: 1 });
  
  // 커스텀 페이지 콘텐츠 예시
  const customPageContent = (pageNumber: number) => (
    <div style={customContentStyle}>
      <div style={documentStyle}>
        <div style={headerStyle}>
          문서 제목
        </div>
        <div style={contentLineStyle}></div>
        <div style={contentLineStyle}></div>
        <div style={contentLineStyle}></div>
        <div style={contentLineStyle}></div>
        <div style={{...contentLineStyle, width: '60%'}}></div>
        <div style={footerStyle}>
          페이지 {pageNumber}
        </div>
      </div>
    </div>
  );

  const handlePageChange = (pageNumber: number) => {
    console.log(`현재 페이지: ${pageNumber}`);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>페이지 미리보기 컴포넌트 예시</h1>
      
      <div style={exampleSectionStyle}>
        <h2 style={sectionTitleStyle}>기본 사용법</h2>
        <div style={previewContainerStyle}>
          <div style={previewWithNavigatorStyle}>
            <PagePreview
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              title="발표 대본"
              description="설명을 입력하세요"
            />
            <PageNavigator
              currentPage={currentPage}
              totalPages={10}
              onPageChange={goToPage}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              onPreviousPage={previousPage}
              onNextPage={nextPage}
            />
          </div>
        </div>
        <p style={descriptionStyle}>
          현재 페이지: {currentPage} / 10
        </p>
      </div>

      <div style={exampleSectionStyle}>
        <h2 style={sectionTitleStyle}>커스텀 콘텐츠</h2>
        <div style={previewContainerStyle}>
          <div style={previewWithNavigatorStyle}>
            <PagePreview
              totalPages={5}
              currentPage={customCurrentPage}
              renderPageContent={customPageContent}
              onPageChange={(page) => console.log(`커스텀 페이지: ${page}`)}
              title="사용자 문서"
              description="커스텀 페이지 콘텐츠"
            />
            <PageNavigator
              currentPage={customCurrentPage}
              totalPages={5}
              onPageChange={customGoToPage}
              canGoPrevious={customCanGoPrevious}
              canGoNext={customCanGoNext}
              onPreviousPage={customPreviousPage}
              onNextPage={customNextPage}
            />
          </div>
        </div>
        <p style={descriptionStyle}>
          현재 페이지: {customCurrentPage} / 5
        </p>
      </div>

      <div style={codeExampleStyle}>
        <h3 style={codeHeadingStyle}>사용 예시 코드:</h3>
        <pre style={codeStyle}>
{`// Hook 사용
const {
  currentPage,
  nextPage,
  previousPage,
  canGoNext,
  canGoPrevious,
  goToPage,
} = usePageNumber({ totalPages: 10, initialPage: 1 });

// 컴포넌트 사용
<PagePreview
  totalPages={10}
  currentPage={currentPage}
  onPageChange={(page) => console.log('페이지 변경:', page)}
  title="발표 대본"
  description="설명을 입력하세요"
  renderPageContent={(pageNumber) => (
    <div>커스텀 페이지 {pageNumber} 내용</div>
  )}
/>

<PageNavigator
  currentPage={currentPage}
  totalPages={10}
  onPageChange={goToPage}
  canGoPrevious={canGoPrevious}
  canGoNext={canGoNext}
  onPreviousPage={previousPage}
  onNextPage={nextPage}
/>`}
        </pre>
      </div>
    </div>
  );
}

// 스타일 정의
const containerStyle: React.CSSProperties = {
  padding: '40px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: 'Pretendard, sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: colors.neutral.gray900,
  marginBottom: '40px',
  textAlign: 'center',
};

const exampleSectionStyle: React.CSSProperties = {
  marginBottom: '48px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 600,
  color: colors.neutral.gray900,
  marginBottom: '20px',
};

const previewContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
};

const previewWithNavigatorStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0px',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.neutral.gray500,
  textAlign: 'center',
  fontWeight: 500,
};

const customContentStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  boxSizing: 'border-box',
};

const documentStyle: React.CSSProperties = {
  width: '200px',
  height: '280px',
  backgroundColor: colors.neutral.white,
  border: `1px solid ${colors.neutral.gray100}`,
  borderRadius: '4px',
  padding: '20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const headerStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: colors.neutral.gray900,
  textAlign: 'center',
  marginBottom: '8px',
};

const contentLineStyle: React.CSSProperties = {
  height: '8px',
  backgroundColor: colors.neutral.gray100,
  borderRadius: '2px',
  width: '100%',
};

const footerStyle: React.CSSProperties = {
  fontSize: '10px',
  color: colors.neutral.gray500,
  textAlign: 'center',
  marginTop: 'auto',
};

const codeExampleStyle: React.CSSProperties = {
  backgroundColor: colors.neutral.gray50,
  padding: '24px',
  borderRadius: '8px',
  border: `1px solid ${colors.neutral.gray100}`,
};

const codeHeadingStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  color: colors.neutral.gray900,
  marginBottom: '16px',
};

const codeStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.neutral.gray900,
  backgroundColor: colors.neutral.white,
  padding: '16px',
  borderRadius: '4px',
  border: `1px solid ${colors.neutral.gray100}`,
  overflow: 'auto',
  fontFamily: 'Monaco, Consolas, monospace',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
}; 