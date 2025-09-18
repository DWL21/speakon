import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScriptModalOverlay } from './ScriptModalOverlay';
import { ScriptModalContainer } from './ScriptModalContainer';
import { ScriptModalContent } from './ScriptModalContent';
import { MemoizedScriptModalPreview } from './ScriptModalPreview';
import { ScriptModalDivider } from './ScriptModalDivider';
import { MemoizedScriptModalForm, ScriptModalFormRef } from './ScriptModalForm';
import { ScriptModalFooter } from './ScriptModalFooter';
import { SlideInput } from './ScriptModalForm';
import { getPdfPageCount } from '../../lib/pdfUtils';
import { ErrorModal } from '../ui/ErrorModal';
import { saveSlides } from '../../lib/mockApi';
import { getFileKey, getScripts, saveScripts as persistScripts, setScript } from '../../lib/scriptStorage';

export interface ScriptModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** PDF 파일 (필수) */
  pdfFile: File;
  /** 슬라이드 입력 데이터 */
  slides?: SlideInput[];
  /** 슬라이드 내용 변경 시 호출되는 콜백 */
  onSlideChange?: (slideNumber: number, content: string) => void;
  /** 저장 버튼 클릭 시 호출되는 콜백 */
  onSave?: (slides: SlideInput[]) => void;
  /** 미리보기 콘텐츠 렌더링 함수 */
  renderPreviewContent?: () => React.ReactNode;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  pdfFile,
  slides = [],
  onSlideChange,
  onSave,
  renderPreviewContent,
}) => {
  const [slideInputs, setSlideInputs] = useState<SlideInput[]>([]);
  const [isLoadingPageCount, setIsLoadingPageCount] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // 현재 미리보기 페이지 상태
  const [currentPreviewPage, setCurrentPreviewPage] = useState<number>(1);
  
  // ScriptModalForm의 ref
  const formRef = useRef<ScriptModalFormRef>(null);
  // Undo 스택: 슬라이드 번호별 변경 이력
  const undoRef = useRef<Record<number, string[]>>({});

  // 고정된 제목과 설명
  const title = "발표 대본";
  const description = "슬라이드에 맞춘 대본을 미리 작성할 수 있어요.";

  // PDF 파일의 페이지 수를 가져와서 슬라이드 생성
  useEffect(() => {
    const loadPdfPageCount = async () => {
      if (!pdfFile) {
        setError('PDF 파일이 필요합니다.');
        return;
      }

      setIsLoadingPageCount(true);
      setError(null);
      
      try {
        // PDF 파일의 실제 페이지 수 가져오기
        const pageCount = await getPdfPageCount(pdfFile);
        console.log('📄 PDF 페이지 수:', pageCount);
        
        // PDF 페이지 수에 맞게 슬라이드 생성 + 로컬 저장 대본 우선 주입
        const pdfSlides = Array.from({ length: pageCount }, (_, index) => {
          const slideNumber = index + 1;
          const existingSlide = slides.find(s => s.slideNumber === slideNumber);
          return existingSlide || {
            slideNumber,
            pageNumber: slideNumber,
            content: ''
          };
        });
        // 로컬 저장된 스크립트와 병합
        const fileKey = getFileKey(pdfFile.name, pdfFile.size);
        const stored = getScripts(fileKey);
        const merged = pdfSlides.map(s => ({ ...s, content: stored[s.slideNumber] ?? s.content }));
        setSlideInputs(merged);
      } catch (error) {
        console.error('PDF 페이지 수 가져오기 실패:', error);
        const errorMessage = error instanceof Error ? error.message : 'PDF 파일을 읽을 수 없습니다. 올바른 PDF 파일인지 확인해주세요.';
        setError(errorMessage);
        setSlideInputs([]);
      } finally {
        setIsLoadingPageCount(false);
      }
    };

    loadPdfPageCount();
  }, [pdfFile, slides]);

  // Cmd/Ctrl+Z: 현재 프리뷰 페이지의 직전 내용으로 롤백
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isUndo = (e.metaKey || e.ctrlKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z');
      if (!isUndo) return;
      const stack = undoRef.current[currentPreviewPage] || [];
      if (stack.length === 0) return;
      const prevText = stack.pop() as string;
      setSlideInputs(prev => prev.map(s => s.slideNumber === currentPreviewPage ? { ...s, content: prevText } : s));
      const fileKey = getFileKey(pdfFile.name, pdfFile.size);
      setScript(fileKey, currentPreviewPage, prevText);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentPreviewPage, pdfFile.name, pdfFile.size]);

  const handleSlideChange = useCallback((slideNumber: number, content: string) => {
    console.log('📝 내용 변경 → 상태 업데이트', slideNumber);
    
    setSlideInputs(prev => {
      // 현재 슬라이드의 내용과 같다면 아무 작업도 하지 않음
      const currentSlide = prev.find(slide => slide.slideNumber === slideNumber);
      if (currentSlide && currentSlide.content === content) {
        console.log('📝 내용 변경 → 이미 같은 내용', slideNumber, '(상태 업데이트 없음)');
        return prev; // 이전 상태 그대로 반환하여 리렌더링 방지
      }
      
      // 실제로 내용이 변경된 경우에만 새로운 상태 반환
      return prev.map(slide => 
        slide.slideNumber === slideNumber
          ? { ...slide, content }
          : slide
      );
    });
    
    onSlideChange?.(slideNumber, content);
  }, [onSlideChange]); // slideInputs 의존성 제거

  // 포커스 변경 시 미리보기 페이지 업데이트
  const handleFocus = useCallback((slideNumber: number) => {
    console.log('🎯 포커스 → 페이지 변경', currentPreviewPage, '→', slideNumber);
    setCurrentPreviewPage(slideNumber);
  }, [currentPreviewPage]);

  const handleSave = useCallback(() => {
    console.log('💾 저장 요청 - 현재 값들 수집 중');
    
    // ScriptModalForm에서 모든 현재 값들을 수집
    const currentValues = formRef.current?.getAllCurrentValues();
    
    if (currentValues) {
      console.log('📊 수집된 현재 값들:', currentValues);
      
      // 상태 업데이트
      setSlideInputs(currentValues);
      
      // 부모 컴포넌트에 저장 요청
      onSave?.(currentValues);
      
      // 개별 슬라이드 변경 알림
      currentValues.forEach(slide => {
        const existingSlide = slideInputs.find(s => s.slideNumber === slide.slideNumber);
        if (!existingSlide || existingSlide.content !== slide.content) {
          onSlideChange?.(slide.slideNumber, slide.content);
        }
      });
      // mock persist
      saveSlides(currentValues).catch(() => {});
      // local persist (all slides)
      const fileKey = getFileKey(pdfFile.name, pdfFile.size);
      const map: Record<number, string> = {} as any;
      currentValues.forEach(s => { map[s.slideNumber] = s.content; });
      persistScripts(fileKey, map);
    }
  }, [slideInputs, onSave, onSlideChange, pdfFile.name, pdfFile.size]);


  // 에러 상태 렌더링
  if (error) {
    return (
      <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
        <ScriptModalContainer>
          <ErrorModal
            title="PDF 파일 오류"
            message={error}
            onClose={onClose}
          />
        </ScriptModalContainer>
      </ScriptModalOverlay>
    );
  }

  // 로딩 상태 렌더링
  if (isLoadingPageCount) {
    return (
      <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
        <ScriptModalContainer>
          <div style={loadingContainerStyle}>
            <div style={loadingSpinnerStyle}></div>
            <div style={loadingTextStyle}>PDF 파일을 분석하는 중...</div>
          </div>
        </ScriptModalContainer>
      </ScriptModalOverlay>
    );
  }

  return (
    <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
      <ScriptModalContainer>
        <ScriptModalContent>
          <MemoizedScriptModalPreview
            title={title}
            description={description}
            pdfFile={pdfFile}
            initialPage={currentPreviewPage}
            totalPages={slideInputs.length}
            renderPreviewContent={renderPreviewContent}
          />
          <ScriptModalDivider />
          <MemoizedScriptModalForm
            ref={formRef}
            slides={slideInputs}
            onSlideChange={handleSlideChange}
            onFocus={handleFocus}
          />
        </ScriptModalContent>
        <ScriptModalFooter
          onClose={onClose}
          onSave={handleSave}
        />
      </ScriptModalContainer>
    </ScriptModalOverlay>
  );
};



const loadingContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  gap: '20px',
  minHeight: '300px',
};

const loadingSpinnerStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #f0f0f0',
  borderTop: '4px solid #3282ff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const loadingTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#666',
  fontFamily: 'Pretendard',
};

// 호환성을 위한 타입 export
export type { SlideInput }; 