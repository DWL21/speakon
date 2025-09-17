import { useNavigate } from 'react-router-dom'
import React, { useRef } from 'react'
import { FileUploadBox } from '../components/upload/FileUploadBox'
import { SlideInput } from '../components/ScriptModal/ScriptModal'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'

export function Home() {
  const navigate = useNavigate()
  const uploadRef = useRef<{ open: () => void }>(null)

  const handleUploadComplete = async (file: File) => {
    console.log('📁 파일 업로드 완료:', file.name);
    
    // PDF 페이지 수 가져오기
    const { getPdfPageCount } = await import('../lib/pdfUtils');
    try {
      const pageCount = await getPdfPageCount(file);
      
      // 빈 슬라이드 생성
      const emptySlides: SlideInput[] = Array.from({ length: pageCount }, (_, index) => ({
        slideNumber: index + 1,
        pageNumber: index + 1,
        content: ''
      }));
      
      // ScriptModal을 건너뛰고 바로 Practice 페이지로 이동
      navigate('/practice', {
        state: {
          pdfFile: file,
          slides: emptySlides
        }
      });
    } catch (error) {
      console.error('PDF 페이지 수 가져오기 실패:', error);
      // 에러 발생 시 기본값으로 처리
      const defaultSlides: SlideInput[] = [{
        slideNumber: 1,
        pageNumber: 1,
        content: ''
      }];
      
      navigate('/practice', {
        state: {
          pdfFile: file,
          slides: defaultSlides
        }
      });
    }
  }


  // 숨겨진 기능: 특정 PDF 파일 자동 로드
  const loadHiddenPdfFile = async () => {
    try {
      // PDF 파일과 대본 데이터를 동시에 로드
      const [pdfResponse, scriptsResponse] = await Promise.all([
        fetch('/[IT프로젝트]Emileo_중간발표PPT.pdf'),
        fetch('/example-scripts.json')
      ]);
      
      if (!pdfResponse.ok) {
        throw new Error('PDF 파일을 찾을 수 없습니다.');
      }
      
      if (!scriptsResponse.ok) {
        throw new Error('대본 파일을 찾을 수 없습니다.');
      }
      
      // PDF 파일 변환
      const blob = await pdfResponse.blob();
      const file = new File([blob], '[IT프로젝트]Emileo_중간발표PPT.pdf', { 
        type: 'application/pdf',
        lastModified: Date.now()
      });
      
      // 대본 데이터 로드
      const scriptsData = await scriptsResponse.json();
      const slidesData: SlideInput[] = scriptsData.slides || [];
      
      console.log('🎯 숨겨진 PDF 파일 로드:', file.name);
      console.log('📜 대본 데이터 로드:', slidesData.length + '개 슬라이드');
      
      // ScriptModal을 건너뛰고 바로 Practice 페이지로 이동
      navigate('/practice', {
        state: {
          pdfFile: file,
          slides: slidesData
        }
      });
    } catch (error) {
      console.error('❌ 숨겨진 파일 로드 실패:', error);
      // 대체 알림 방법
      alert('🎯 숨겨진 기능이 발견되었습니다!\n하지만 파일을 로드할 수 없습니다.');
    }
  }


  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: colors.background.normal,
        color: colors.label.normal,
        padding: '44px 0',
        fontFamily: 'Pretendard, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1250px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        {/* 상단 안내 카드 */}
        <div
          onClick={() => uploadRef.current?.open()}
          style={{
            backgroundColor: colors.fill.normal,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '24px 36px',
            borderRadius: '24px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '51px',
              backgroundColor: colors.label.normal,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 0 auto',
            }}
          >
            {/* 파일 아이콘 */}
            <svg width="24" height="24" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6911 0.110583C10.2284 -0.000499591 9.74865 -0.000271186 9.11366 3.08906e-05L5.7587 6.26003e-05C4.95373 4.98449e-05 4.28937 3.9354e-05 3.74818 0.0442567C3.18608 0.0901819 2.66937 0.188746 2.18404 0.436037C1.43139 0.81953 0.819469 1.43145 0.435975 2.1841C0.188684 2.66944 0.0901201 3.18614 0.0441949 3.74824C-2.21543e-05 4.28943 -1.19522e-05 4.95378 4.11647e-07 5.75875V14.2414C-1.19522e-05 15.0463 -2.2158e-05 15.7107 0.0441949 16.2519C0.0901201 16.814 0.188684 17.3307 0.435975 17.816C0.819469 18.5687 1.43139 19.1806 2.18404 19.5641C2.66937 19.8114 3.18608 19.9099 3.74818 19.9559C4.28937 20.0001 4.95372 20.0001 5.75868 20.0001H10.2413C11.0463 20.0001 11.7106 20.0001 12.2518 19.9559C12.8139 19.9099 13.3306 19.8114 13.816 19.5641C14.5686 19.1806 15.1805 18.5687 15.564 17.816C15.8113 17.3307 15.9099 16.814 15.9558 16.2519C16 15.7107 16 15.0463 16 14.2414L16 6.8864C16.0003 6.25142 16.0006 5.77161 15.8895 5.30892C15.7915 4.90078 15.6299 4.5106 15.4106 4.15271C15.1619 3.74699 14.8225 3.40789 14.3733 2.95909L13.041 1.62678C12.5922 1.17756 12.2531 0.838129 11.8474 0.589502C11.4895 0.370188 11.0993 0.20857 10.6911 0.110583ZM9 2.00006H5.8C4.94342 2.00006 4.36113 2.00084 3.91104 2.03761C3.47262 2.07343 3.24842 2.13836 3.09202 2.21805C2.7157 2.4098 2.40973 2.71576 2.21799 3.09208C2.1383 3.24848 2.07337 3.47269 2.03755 3.9111C2.00078 4.36119 2 4.94348 2 5.80006V14.2001C2 15.0566 2.00078 15.6389 2.03755 16.089C2.07337 16.5274 2.1383 16.7516 2.21799 16.908C2.40973 17.2844 2.7157 17.5903 3.09202 17.7821C3.24842 17.8618 3.47262 17.9267 3.91104 17.9625C4.36113 17.9993 4.94342 18.0001 5.8 18.0001H10.2C11.0566 18.0001 11.6389 17.9993 12.089 17.9625C12.5274 17.9267 12.7516 17.8618 12.908 17.7821C13.2843 17.5903 13.5903 17.2844 13.782 16.908C13.8617 16.7516 13.9266 16.5274 13.9624 16.089C13.9992 15.6389 14 15.0566 14 14.2001V7.00006H12C10.3431 7.00006 9 5.65692 9 4.00006V2.00006ZM13.56 5.00006C13.4398 4.85796 13.2479 4.66216 12.887 4.30128L11.6988 3.11306C11.3379 2.75218 11.1421 2.56026 11 2.44009V4.00006C11 4.55235 11.4477 5.00006 12 5.00006H13.56Z" fill="white" />
              <path d="M4 1C4 0.447715 3.55228 0 3 0C2.44772 0 2 0.447715 2 1V2H1C0.447715 2 0 2.44772 0 3C0 3.55228 0.447715 4 1 4H2V5C2 5.55228 2.44772 6 3 6C3.55228 6 4 5.55228 4 5V4H5C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2H4V1Z" fill="white" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ ...typography.title[3], color: colors.static.black }}>새 발표</div>
            <div style={{ ...typography.label, color: colors.label.neutral }}>발표 자료를 업로드하고 발표 연습을 시작해보세요.</div>
          </div>
        </div>

        {/* 섹션 타이틀 */}
        <div style={{ padding: '12px 34px 0' }}>
          <div style={{ ...typography.heading[2], color: '#333333' }}>전체 보드</div>
        </div>

        {/* 빈 상태 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
          <div style={{ ...typography.body.normal, color: colors.label.assistive }}>등록된 파일이 없습니다.</div>
        </div>

        {/* 숨김 업로드 박스 (상단 카드 클릭으로 트리거) */}
        <div style={{ display: 'none' }}>
          <FileUploadBox ref={uploadRef} onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    </div>
  )
} 