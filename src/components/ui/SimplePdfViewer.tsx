import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../../theme/colors';

interface SimplePdfViewerProps {
  file: File | null;
  currentPage: number;
}

export const SimplePdfViewer: React.FC<SimplePdfViewerProps> = ({
  file,
  currentPage
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log('🖼️ SimplePdfViewer props:', { 
    fileName: file?.name || 'null', 
    currentPage,
    fileSize: file?.size || 0,
    fileType: file?.type || 'unknown'
  });

  // PDF 파일 URL 생성
  useEffect(() => {
    console.log('📄 SimplePdfViewer useEffect - 파일 변경:', file?.name || 'null');
    
    if (!file) {
      console.log('📄 파일이 없음, URL 초기화');
      setPdfUrl(null);
      setCanvasDataUrl(null);
      setError(null);
      return;
    }

    if (file.type !== 'application/pdf') {
      console.error('❌ PDF가 아닌 파일:', file.type);
      setError('PDF 파일만 지원됩니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // PDF URL 생성
    try {
      console.log('🔗 PDF URL 생성 중...');
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      console.log('✅ PDF URL 생성 완료:', url);

      // Cleanup function
      return () => {
        console.log('🧹 PDF URL 정리:', url);
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      console.error('❌ PDF URL 생성 오류:', err);
      setError('PDF 파일을 로드할 수 없습니다.');
      setIsLoading(false);
    }
  }, [file]);

  // PDF 페이지 렌더링
  useEffect(() => {
    if (!pdfUrl || !file) {
      setIsLoading(false);
      return;
    }

    const renderPdfPage = async () => {
      try {
        console.log('🎨 PDF 페이지 렌더링 시작 - 페이지:', currentPage);
        
        // PDF.js가 로드되지 않은 경우 iframe 방식으로 폴백
        if (!(window as any).pdfjsLib) {
          console.log('📄 PDF.js 없음, iframe 방식 사용');
          setIsLoading(false);
          return;
        }

        const pdf = await (window as any).pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(currentPage);
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        
        // Canvas를 이미지로 변환
        const dataUrl = canvas.toDataURL();
        setCanvasDataUrl(dataUrl);
        
        console.log('✅ PDF 페이지 렌더링 완료');
        setIsLoading(false);
      } catch (err) {
        console.error('❌ PDF 렌더링 오류:', err);
        console.log('📄 PDF.js 렌더링 실패, iframe 방식으로 폴백');
        setIsLoading(false);
      }
    };

    renderPdfPage();
  }, [pdfUrl, currentPage, file]);

  const renderContent = () => {
    if (isLoading) {
      console.log('⏳ PDF 로딩 중 상태 렌더링');
      return (
        <div style={loadingStyle}>
          <div style={loadingSpinnerStyle}></div>
          <div style={loadingTextStyle}>PDF 로딩 중...</div>
        </div>
      );
    }

    if (error) {
      console.log('❌ 에러 상태 렌더링:', error);
      return (
        <div style={errorStyle}>
          <div style={errorIconStyle}>⚠️</div>
          <div style={errorTextStyle}>{error}</div>
        </div>
      );
    }

    if (!pdfUrl) {
      console.log('📄 플레이스홀더 렌더링');
      return (
        <div style={placeholderStyle}>
          <div style={placeholderIconStyle}>📄</div>
          <div style={placeholderTextStyle}>
            PDF 파일을 업로드해주세요
          </div>
        </div>
      );
    }

    // Canvas로 렌더링된 이미지가 있으면 사용
    if (canvasDataUrl) {
      console.log('🎨 Canvas 렌더링된 PDF 표시');
      return (
        <div style={viewerContainerStyle}>
          <img 
            src={canvasDataUrl} 
            alt={`PDF Page ${currentPage}`}
            style={pdfImageStyle}
          />
        </div>
      );
    }

    // PDF.js가 없거나 실패한 경우 iframe 방식으로 폴백
    const iframeSrc = `${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit&view=FitH`;
    console.log('🎬 PDF iframe 렌더링 - 페이지:', currentPage, 'URL:', iframeSrc);
    
    return (
      <div style={viewerContainerStyle}>
        <iframe
          src={iframeSrc}
          style={iframeStyle}
          title={`PDF Page ${currentPage}`}
          onLoad={() => console.log(`✅ PDF iframe 로드 완료 - 페이지 ${currentPage}`)}
          onError={(e) => console.error(`❌ PDF iframe 로드 오류:`, e)}
        />
        <div style={pageInfoStyle}>
          페이지 {currentPage}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {renderContent()}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }} 
      />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.background.normal,
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
};

const viewerContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '4px',
};

const pageInfoStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: colors.static.white,
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
};

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
};

const loadingSpinnerStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  border: `3px solid ${colors.line.normal}`,
  borderTop: `3px solid ${colors.primary.normal}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const loadingTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.label.alternative,
};

const errorStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '20px',
  textAlign: 'center',
};

const errorIconStyle: React.CSSProperties = {
  fontSize: '32px',
};

const errorTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.semantic.warning,
};

const placeholderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const placeholderIconStyle: React.CSSProperties = {
  fontSize: '48px',
  opacity: 0.5,
};

const placeholderTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.label.alternative,
};

const pdfImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: '4px',
}; 