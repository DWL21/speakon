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
        
        // PDF 내용을 문자열로 변환 (바이너리 데이터 제외)
        let pdfContent = '';
        for (let i = 0; i < uint8Array.length; i++) {
          const byte = uint8Array[i];
          // 출력 가능한 ASCII 문자만 포함
          if (byte >= 32 && byte <= 126) {
            pdfContent += String.fromCharCode(byte);
          } else {
            pdfContent += ' ';
          }
        }
        
        console.log('PDF 내용 길이:', pdfContent.length);
        
        let pageCount = 0;
        
        // 방법 1: /Type /Pages 객체에서 /Count 찾기 (가장 정확한 방법)
        const pagesObjectRegex = /\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/gi;
        let match = pagesObjectRegex.exec(pdfContent);
        if (match) {
          pageCount = parseInt(match[1], 10);
          console.log('방법 1 - Pages 객체에서 Count 발견:', pageCount);
        }
        
        // 방법 2: 단순히 /Count 키워드 찾기
        if (pageCount === 0) {
          const countMatches = pdfContent.match(/\/Count\s+(\d+)/gi);
          if (countMatches && countMatches.length > 0) {
            // 가장 큰 숫자를 페이지 수로 추정
            const counts = countMatches.map(m => {
              const num = m.match(/\d+/);
              return num ? parseInt(num[0], 10) : 0;
            });
            pageCount = Math.max(...counts);
            console.log('방법 2 - Count 키워드에서 최대값:', pageCount);
          }
        }
        
        // 방법 3: /Type /Page (단일 페이지) 객체 개수 세기
        if (pageCount === 0) {
          const pageObjectMatches = pdfContent.match(/\/Type\s*\/Page\s/gi);
          if (pageObjectMatches) {
            pageCount = pageObjectMatches.length;
            console.log('방법 3 - Page 객체 개수:', pageCount);
          }
        }
        
        // 방법 4: /Kids 배열 분석
        if (pageCount === 0) {
          const kidsMatches = pdfContent.match(/\/Kids\s*\[[^\]]*\]/gi);
          if (kidsMatches) {
            let totalRefs = 0;
            kidsMatches.forEach(kids => {
              const refs = kids.match(/\d+\s+\d+\s+R/g);
              if (refs) totalRefs += refs.length;
            });
            if (totalRefs > 0) {
              pageCount = totalRefs;
              console.log('방법 4 - Kids 배열 분석:', pageCount);
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