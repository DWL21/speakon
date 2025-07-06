import { useState, useEffect, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';

// PDF.js worker 비활성화 - 메인 스레드에서 실행 (CORS 문제 회피)
pdfjs.GlobalWorkerOptions.workerSrc = '';
console.log('📡 PDF.js Worker 비활성화, 메인 스레드에서 실행');

interface PdfPage {
  pageNumber: number;
  canvas: HTMLCanvasElement;
  imageUrl: string;
}

interface UsePdfRendererReturn {
  pages: PdfPage[];
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  getPageImageUrl: (pageNumber: number) => string | null;
}

export const usePdfRenderer = (file: File | null): UsePdfRendererReturn => {
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderPage = useCallback(async (pdf: any, pageNumber: number): Promise<PdfPage | null> => {
    try {
      console.log(`🎨 페이지 ${pageNumber} 렌더링 시작`);
      const page = await pdf.getPage(pageNumber);
      console.log(`📄 페이지 ${pageNumber} 로드 완료`);
      
      const viewport = page.getViewport({ scale: 1.5 });
      console.log(`📐 페이지 ${pageNumber} 뷰포트:`, viewport.width, 'x', viewport.height);
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Canvas context not available');
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      console.log(`🖼️ 페이지 ${pageNumber} 캔버스 렌더링 시작`);
      await page.render(renderContext).promise;
      console.log(`✅ 페이지 ${pageNumber} 캔버스 렌더링 완료`);
      
      // Canvas를 Blob으로 변환 후 URL 생성
      const imageUrl = await new Promise<string>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            console.log(`🔗 페이지 ${pageNumber} 이미지 URL 생성 완료`);
            resolve(url);
          } else {
            reject(new Error('Canvas to blob conversion failed'));
          }
        }, 'image/png');
      });

      return {
        pageNumber,
        canvas,
        imageUrl,
      };
    } catch (err) {
      console.error(`❌ 페이지 ${pageNumber} 렌더링 오류:`, err);
      return null;
    }
  }, []);

  const loadPdf = useCallback(async (pdfFile: File) => {
    console.log('🔄 PDF 로딩 시작:', pdfFile.name);
    setIsLoading(true);
    setError(null);
    setPages([]);

    try {
      console.log('📂 파일을 ArrayBuffer로 변환 중...');
      const arrayBuffer = await pdfFile.arrayBuffer();
      console.log('📄 PDF arrayBuffer 크기:', arrayBuffer.byteLength);
      
      console.log('🔧 PDF.js로 문서 로딩 중...');
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      console.log('📊 PDF 로드 완료, 총 페이지:', pdf.numPages);
      
      setTotalPages(pdf.numPages);

      // 모든 페이지를 순차적으로 렌더링
      const renderedPages: PdfPage[] = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        console.log(`🎨 페이지 ${i} 렌더링 중...`);
        const renderedPage = await renderPage(pdf, i);
        if (renderedPage) {
          renderedPages.push(renderedPage);
          console.log(`✅ 페이지 ${i} 렌더링 완료`);
        }
      }

      console.log('🎉 모든 페이지 렌더링 완료:', renderedPages.length);
      setPages(renderedPages);
    } catch (err: any) {
      console.error('❌ PDF 로딩 오류 상세:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      let errorMessage = 'PDF 파일을 로드하는 중 오류가 발생했습니다.';
      
      if (err.name === 'InvalidPDFException') {
        errorMessage = '유효하지 않은 PDF 파일입니다.';
      } else if (err.name === 'MissingPDFException') {
        errorMessage = 'PDF 파일이 손상되었거나 읽을 수 없습니다.';
      } else if (err.name === 'UnexpectedResponseException') {
        errorMessage = 'PDF 파일을 읽는 중 예상치 못한 오류가 발생했습니다.';
      } else if (err.message?.includes('Worker')) {
        errorMessage = 'PDF 처리 엔진을 로드할 수 없습니다. 인터넷 연결을 확인해주세요.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [renderPage]);

  const getPageImageUrl = useCallback((pageNumber: number): string | null => {
    const page = pages.find(p => p.pageNumber === pageNumber);
    const result = page ? page.imageUrl : null;
    console.log(`🖼️ 페이지 ${pageNumber} 이미지 URL 요청:`, result ? '있음' : '없음');
    return result;
  }, [pages]);

  useEffect(() => {
    console.log('📁 파일 변경:', file?.name || 'null');
    if (file && file.type === 'application/pdf') {
      loadPdf(file);
    } else if (file && file.type !== 'application/pdf') {
      console.error('❌ PDF가 아닌 파일:', file.type);
      setError('PDF 파일만 업로드할 수 있습니다.');
    }

    // cleanup: URL.createObjectURL로 생성된 URL들을 정리
    return () => {
      pages.forEach(page => {
        if (page.imageUrl) {
          URL.revokeObjectURL(page.imageUrl);
        }
      });
    };
  }, [file, loadPdf]);

  return {
    pages,
    totalPages,
    isLoading,
    error,
    getPageImageUrl,
  };
}; 