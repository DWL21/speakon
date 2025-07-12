import React, { useState, useEffect, useCallback } from 'react';
import { ScriptModalHeader } from './ScriptModalHeader';
import { SimplePdfViewer } from '../ui/SimplePdfViewer';

interface ScriptModalPreviewProps {
  title: string;
  description: string;
  /** PDF 파일 */
  pdfFile?: File | null;
  /** 초기 페이지 번호 */
  initialPage?: number;
  /** 총 페이지 수 */
  totalPages: number;
  /** 미리보기 콘텐츠 렌더링 함수 (기존 호환성) */
  renderPreviewContent?: () => React.ReactNode;
  /** 포커스 변경 시 호출되는 콜백 */
  onFocusChange?: (slideNumber: number) => void;
  /** 포커스 핸들러 등록 콜백 */
  onRegisterFocusHandler?: (handler: (slideNumber: number) => void) => void;
}

export const ScriptModalPreview: React.FC<ScriptModalPreviewProps> = ({
  title,
  description,
  pdfFile,
  initialPage = 1,
  totalPages,
  renderPreviewContent,
  onFocusChange,
  onRegisterFocusHandler,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // 초기 페이지 변경 시 동기화
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handleFocusChange = useCallback((slideNumber: number) => {
    // 현재 페이지와 같다면 아무 작업도 하지 않음
    if (currentPage === slideNumber) {
      console.log('🎯 포커스 → 이미 같은 페이지', slideNumber, '(변경 없음)');
      return;
    }
    
    console.log('🎯 포커스 → 페이지 변경', currentPage, '→', slideNumber);
    setCurrentPage(slideNumber);
    onFocusChange?.(slideNumber);
  }, [currentPage, onFocusChange]);

  // 포커스 핸들러 등록
  useEffect(() => {
    onRegisterFocusHandler?.(handleFocusChange);
  }, [handleFocusChange, onRegisterFocusHandler]);

  const renderContent = () => {
    // PDF 파일이 있으면 SimplePdfViewer 사용
    if (pdfFile) {
      return (
        <SimplePdfViewer
          file={pdfFile}
          currentPage={currentPage}
        />
      );
    }

    // 기존 방식의 미리보기 콘텐츠가 있으면 사용
    if (renderPreviewContent) {
      return renderPreviewContent();
    }

    // 기본 플레이스홀더
    return (
      <div style={previewPlaceholderStyle}>
        <div style={previewImageStyle} />
      </div>
    );
  };

  return (
    <div style={previewSectionStyle}>
      <ScriptModalHeader title={title} description={description} />
      <div style={previewContentStyle}>
        {renderContent()}
      </div>
    </div>
  );
};

// 메모이제이션된 컴포넌트로 export
export const MemoizedScriptModalPreview = React.memo(ScriptModalPreview);

const previewSectionStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '350px',
  gap: '20px',
};

const previewContentStyle: React.CSSProperties = {
  backgroundColor: '#f1f2f5',
  height: '459px',
  width: '100%',
  maxWidth: '340px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  overflow: 'hidden',
};

const previewPlaceholderStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const previewImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: '#eeeeee',
  borderRadius: '8px',
}; 