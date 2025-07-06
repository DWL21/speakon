import React, { useState } from 'react';
import { PagePreview, PageNavigator, PageList, ErrorMessage } from '../components/ui';
import { colors } from '../theme/colors';

export function PagePreviewExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [gridCurrentPage, setGridCurrentPage] = useState(1);
  const [showError, setShowError] = useState(false);
  const totalPages = 10;
  
  const [pages] = useState([
    { id: 1, title: '제목 페이지', description: '프레젠테이션 제목', isSelected: false },
    { id: 2, title: '개요', description: '프레젠테이션 개요', isSelected: false },
    { id: 3, title: '목차', description: '발표 내용 목차', isSelected: false },
    { id: 4, title: '소개', description: '회사 소개', isSelected: false },
    { id: 5, title: '제품', description: '제품 소개', isSelected: false },
    { id: 6, title: '시장 분석', description: '시장 현황 분석', isSelected: false },
    { id: 7, title: '경쟁 분석', description: '경쟁사 분석', isSelected: false },
    { id: 8, title: '전략', description: '마케팅 전략', isSelected: false },
    { id: 9, title: '결론', description: '결론 및 요약', isSelected: false },
    { id: 10, title: '감사', description: '감사 인사', isSelected: false },
  ]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`현재 페이지: ${pageNumber}`);
  };

  const handleGridPageChange = (pageNumber: number) => {
    setGridCurrentPage(pageNumber);
    console.log(`격자 페이지: ${pageNumber}`);
  };

  const handlePageSelect = (pageId: number) => {
    console.log(`페이지 선택: ${pageId}`);
  };

  const handleAddPage = () => {
    console.log('새 페이지 추가');
    setShowError(true);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>피그마 디자인 시스템 컴포넌트 예시</h1>
      
      <div style={exampleSectionStyle}>
        <h2 style={sectionTitleStyle}>1. 페이지 네비게이터 (사이드바)</h2>
        <div style={previewContainerStyle}>
          <PageNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <p style={descriptionStyle}>
          현재 페이지: {currentPage} / {totalPages}
        </p>
      </div>

      <div style={exampleSectionStyle}>
        <h2 style={sectionTitleStyle}>2. 페이지 미리보기 (격자형)</h2>
        <div style={previewContainerStyle}>
          <PagePreview
            totalPages={totalPages}
            currentPage={gridCurrentPage}
            onPageChange={handleGridPageChange}
            title="발표 대본"
            description="설명을 입력하세요"
          />
        </div>
        <p style={descriptionStyle}>
          선택된 페이지: {gridCurrentPage} / {totalPages}
        </p>
      </div>

      <div style={exampleSectionStyle}>
        <h2 style={sectionTitleStyle}>3. 페이지 목록</h2>
        <div style={previewContainerStyle}>
          <PageList
            pages={pages}
            onPageSelect={handlePageSelect}
            onAddPage={handleAddPage}
            title="페이지 목록"
          />
        </div>
      </div>

      <div style={exampleSectionStyle}>
        <h2 style={sectionTitleStyle}>4. 에러 메시지</h2>
        <div style={previewContainerStyle}>
          <div style={errorExampleStyle}>
            <ErrorMessage
              title="업로드 실패"
              message="파일 업로드에 실패했습니다. 다시 시도해주세요."
              type="error"
              onClose={() => console.log('에러 메시지 닫기')}
            />
            <ErrorMessage
              title="알림"
              message="새 페이지가 추가되었습니다."
              type="info"
              onClose={() => console.log('알림 닫기')}
            />
          </div>
        </div>
      </div>

      {showError && (
        <div style={overlayStyle}>
          <div style={errorModalStyle}>
            <ErrorMessage
              title="기능 준비 중"
              message="페이지 추가 기능은 아직 준비 중입니다."
              type="warning"
              onClose={() => setShowError(false)}
            />
          </div>
        </div>
      )}

      <div style={codeExampleStyle}>
        <h3 style={codeHeadingStyle}>사용 예시 코드:</h3>
        <pre style={codeStyle}>
{`// 페이지 네비게이터
<PageNavigator
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>

// 페이지 미리보기 (격자형)
<PagePreview
  totalPages={totalPages}
  currentPage={currentPage}
  onPageChange={handlePageChange}
  title="발표 대본"
  description="설명을 입력하세요"
/>

// 페이지 목록
<PageList
  pages={pages}
  onPageSelect={handlePageSelect}
  onAddPage={handleAddPage}
  title="페이지 목록"
/>

// 에러 메시지
<ErrorMessage
  title="업로드 실패"
  message="파일 업로드에 실패했습니다."
  type="error"
  onClose={() => console.log('닫기')}
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
  backgroundColor: colors.background.alternative,
  minHeight: '100vh',
};

const titleStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: colors.label.normal,
  marginBottom: '40px',
  textAlign: 'center',
};

const exampleSectionStyle: React.CSSProperties = {
  marginBottom: '48px',
  backgroundColor: colors.background.normal,
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 600,
  color: colors.label.normal,
  marginBottom: '20px',
};

const previewContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.label.alternative,
  textAlign: 'center',
  fontWeight: 500,
};

const errorExampleStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
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

const errorModalStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
};

const codeExampleStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
};

const codeHeadingStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  color: colors.label.normal,
  marginBottom: '16px',
};

const codeStyle: React.CSSProperties = {
  backgroundColor: colors.fill.normal,
  padding: '20px',
  borderRadius: '8px',
  fontSize: '14px',
  color: colors.label.normal,
  fontFamily: 'monospace',
  overflow: 'auto',
  lineHeight: '1.5',
  margin: 0,
}; 