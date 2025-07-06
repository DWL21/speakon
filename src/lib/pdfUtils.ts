/**
 * PDF 파일의 페이지 수를 가져오는 함수
 * @param file PDF 파일
 * @returns Promise<number> 페이지 수
 */
export async function getPdfPageCount(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/pdf') {
      reject(new Error('올바른 PDF 파일이 아닙니다.'));
      return;
    }

    const fileReader = new FileReader();
    
    fileReader.onload = function() {
      try {
        const arrayBuffer = this.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // PDF 헤더 확인
        const header = String.fromCharCode.apply(null, Array.from(uint8Array.slice(0, 8)));
        if (!header.startsWith('%PDF-')) {
          reject(new Error('유효하지 않은 PDF 파일입니다.'));
          return;
        }
        
        // PDF 내용을 여러 방식으로 처리
        console.log('PDF 내용 길이:', uint8Array.length);
        
        let pageCount = 0;
        
        // 방법 1: 바이너리 데이터에서 직접 패턴 검색
        const uint8String = Array.from(uint8Array).map(b => String.fromCharCode(b)).join('');
        
        // /Type /Pages 와 /Count 패턴 찾기
        const pagesTypePattern = /\/Type\s*\/Pages/gi;
        const countPattern = /\/Count\s+(\d+)/gi;
        
        let pagesMatches = [...uint8String.matchAll(pagesTypePattern)];
        let countMatches = [...uint8String.matchAll(countPattern)];
        
        console.log('방법 1 - Pages 타입 발견:', pagesMatches.length, '개');
        console.log('방법 1 - Count 패턴 발견:', countMatches.length, '개');
        
        if (countMatches.length > 0) {
          const counts = countMatches.map(match => parseInt(match[1], 10)).filter(n => !isNaN(n));
          if (counts.length > 0) {
            pageCount = Math.max(...counts);
            console.log('방법 1 - Count에서 최대값:', pageCount, '(전체 Count 값들:', counts, ')');
          }
        }
        
        // 방법 2: ASCII 변환된 내용에서 검색
        if (pageCount === 0) {
          let pdfContent = '';
          for (let i = 0; i < Math.min(uint8Array.length, 500000); i++) { // 메모리 절약을 위해 앞 500KB만 처리
            const byte = uint8Array[i];
            if (byte >= 32 && byte <= 126) {
              pdfContent += String.fromCharCode(byte);
            } else {
              pdfContent += ' ';
            }
          }
          
          const cleanCountMatches = pdfContent.match(/\/Count\s+(\d+)/gi);
          if (cleanCountMatches && cleanCountMatches.length > 0) {
            const counts = cleanCountMatches.map(m => {
              const num = m.match(/\d+/);
              return num ? parseInt(num[0], 10) : 0;
            }).filter(n => n > 0);
            
            if (counts.length > 0) {
              pageCount = Math.max(...counts);
              console.log('방법 2 - ASCII 변환 후 Count 최대값:', pageCount, '(Count 값들:', counts, ')');
            }
          }
        }
        
        // 방법 3: /Type /Page 개별 페이지 객체 카운트
        if (pageCount === 0) {
          const pageObjectPattern = /\/Type\s*\/Page(?!\s*s)/gi;
          const pageMatches = [...uint8String.matchAll(pageObjectPattern)];
          if (pageMatches.length > 0) {
            pageCount = pageMatches.length;
            console.log('방법 3 - Page 객체 개수:', pageCount);
          }
        }
        
        // 방법 4: xref 테이블에서 페이지 객체 추정
        if (pageCount === 0) {
          const xrefPattern = /xref\s+\d+\s+(\d+)/gi;
          const xrefMatches = [...uint8String.matchAll(xrefPattern)];
          if (xrefMatches.length > 0) {
            const objectCounts = xrefMatches.map(match => parseInt(match[1], 10));
            const estimatedPages = Math.max(...objectCounts);
            // xref의 객체 수에서 페이지 수를 추정 (보통 객체 수의 1/3 ~ 1/5 정도가 페이지)
            if (estimatedPages > 10) {
              pageCount = Math.max(1, Math.floor(estimatedPages / 4));
              console.log('방법 4 - xref 기반 추정:', pageCount, '(총 객체 수:', estimatedPages, ')');
            }
          }
        }
        

        
        console.log('최종 페이지 수:', pageCount);
        
        if (pageCount > 0 && pageCount < 10000) { // 합리적인 범위 체크
          resolve(pageCount);
        } else {
          reject(new Error('PDF 페이지 수를 확인할 수 없습니다. 파일이 손상되었거나 지원되지 않는 형식일 수 있습니다.'));
        }
      } catch (error) {
        console.error('PDF 분석 오류:', error);
        reject(new Error('PDF 파일을 분석하는 중 오류가 발생했습니다. 파일이 손상되었거나 지원되지 않는 형식일 수 있습니다.'));
      }
    };
    
    fileReader.onerror = function() {
      reject(new Error('PDF 파일을 읽을 수 없습니다.'));
    };
    
    fileReader.readAsArrayBuffer(file);
  });
} 