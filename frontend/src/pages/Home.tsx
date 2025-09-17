import { useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { FileUploadBox } from '../components/upload/FileUploadBox'
import { SlideInput } from '../components/ScriptModal/ScriptModal'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { upsertFile, listFiles, removeFile, StoredFileMeta } from '../lib/boardStorage'
import { BoardCard } from '../components/ui/BoardCard'

export function Home() {
  const navigate = useNavigate()
  const uploadRef = useRef<{ open: () => void }>(null)
  const [files, setFiles] = useState<StoredFileMeta[]>([])

  useEffect(() => {
    setFiles(listFiles())
  }, [])

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
      
      // 보드에 메타 저장 (모킹, 중복 방지)
      upsertFile({ name: file.name, size: file.size, pageCount })
      setFiles(listFiles())
      
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
      
      // 보드에 메타 저장 (페이지 수 미상, 중복 방지)
      upsertFile({ name: file.name, size: file.size })
      setFiles(listFiles())
      
      navigate('/practice', {
        state: {
          pdfFile: file,
          slides: defaultSlides
        }
      });
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
            {/* 파일 추가 아이콘 (사용자 제공 SVG) */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.6911 2.11058C14.2284 1.9995 13.7487 1.99973 13.1137 2.00003L9.7587 2.00006C8.95373 2.00005 8.28937 2.00004 7.74818 2.04426C7.18608 2.09018 6.66937 2.18875 6.18404 2.43604C5.43139 2.81953 4.81947 3.43145 4.43598 4.1841C4.18868 4.66944 4.09012 5.18614 4.04419 5.74824C3.99998 6.28943 3.99999 6.95378 4 7.75875V16.2414C3.99999 17.0463 3.99998 17.7107 4.04419 18.2519C4.09012 18.814 4.18868 19.3307 4.43598 19.816C4.81947 20.5687 5.43139 21.1806 6.18404 21.5641C6.66937 21.8114 7.18608 21.9099 7.74818 21.9559C8.28937 22.0001 8.95372 22.0001 9.75868 22.0001H14.2413C15.0463 22.0001 15.7106 22.0001 16.2518 21.9559C16.8139 21.9099 17.3306 21.8114 17.816 21.5641C18.5686 21.1806 19.1805 20.5687 19.564 19.816C19.8113 19.3307 19.9099 18.814 19.9558 18.2519C20 17.7107 20 17.0463 20 16.2414L20 8.8864C20.0003 8.25142 20.0006 7.77161 19.8895 7.30892C19.7915 6.90078 19.6299 6.5106 19.4106 6.15271C19.1619 5.74699 18.8225 5.40789 18.3733 4.95909L17.041 3.62678C16.5922 3.17756 16.2531 2.83813 15.8474 2.5895C15.4895 2.37019 15.0993 2.20857 14.6911 2.11058ZM13 4.00006H9.8C8.94342 4.00006 8.36113 4.00084 7.91104 4.03761C7.47262 4.07343 7.24842 4.13836 7.09202 4.21805C6.7157 4.4098 6.40973 4.71576 6.21799 5.09208C6.1383 5.24848 6.07337 5.47269 6.03755 5.9111C6.00078 6.36119 6 6.94348 6 7.80006V16.2001C6 17.0566 6.00078 17.6389 6.03755 18.089C6.07337 18.5274 6.1383 18.7516 6.21799 18.908C6.40973 19.2844 6.7157 19.5903 7.09202 19.7821C7.24842 19.8618 7.47262 19.9267 7.91104 19.9625C8.36113 19.9993 8.94342 20.0001 9.8 20.0001H14.2C15.0566 20.0001 15.6389 19.9993 16.089 19.9625C16.5274 19.9267 16.7516 19.8618 16.908 19.7821C17.2843 19.5903 17.5903 19.2844 17.782 18.908C17.8617 18.7516 17.9266 18.5274 17.9624 18.089C17.9992 17.6389 18 17.0566 18 16.2001V9.00006H16C14.3431 9.00006 13 7.65692 13 6.00006V4.00006ZM17.56 7.00006C17.4398 6.85796 17.2479 6.66216 16.887 6.30128L15.6988 5.11306C15.3379 4.75218 15.1421 4.56026 15 4.44009V6.00006C15 6.55235 15.4477 7.00006 16 7.00006H17.56Z" fill="white" />
              <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V13H10C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H11V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15H14C14.5523 15 15 14.5523 15 14C15 13.4477 14.5523 13 14 13H13V12Z" fill="white" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ ...typography.title[3], color: colors.static.black }}>새 발표</div>
            <div style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '14px', color: colors.label.neutral }}>
              발표 자료를 업로드하고 발표 연습을 시작해보세요.
            </div>
          </div>
        </div>

        {/* 섹션 타이틀 */}
        <div style={{ padding: '12px 34px 0' }}>
          <div style={{ ...typography.heading[2], color: '#333333' }}>전체 보드</div>
        </div>

        {/* 카드 목록 / 빈 상태 */}
        {files.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '634px' }}>
            <div style={{ ...typography.body.normal, color: colors.label.assistive }}>등록된 파일이 없습니다.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '12px', padding: '12px 34px' }}>
            {files.map(f => (
              <BoardCard key={f.id} file={f} onDelete={(id: string) => { removeFile(id); setFiles(listFiles()); }} />
            ))}
          </div>
        )}

        {/* 숨김 업로드 박스 (상단 카드 클릭으로 트리거) */}
        <div style={{ display: 'none' }}>
          <FileUploadBox ref={uploadRef} onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    </div>
  )
} 