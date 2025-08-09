import { useNavigate } from 'react-router-dom'
import { TextSection } from '../components/ui/TextSection'
import { FileUploadBox } from '../components/upload/FileUploadBox'
import { SlideInput } from '../components/ScriptModal/ScriptModal'
import { colors } from '../theme/colors'

export function Home() {
  const navigate = useNavigate()

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
        padding: '40px 20px',
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
      <div 
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* 타이틀 섹션 */}
        <div style={{ width: '100%', paddingLeft: '15px' }}>
          <TextSection 
            title="발표 연습, 이젠 SpeakON에서 끝내세요!"
            subtitle="파일 업로드하고 발표 연습을 시작해보세요."
            onTitleClick={loadHiddenPdfFile}
          />
        </div>
        
        {/* 파일 업로드 섹션 */}
        <div style={{ width: '100%' }}>
          <FileUploadBox onUploadComplete={handleUploadComplete} />
        </div>
      </div>

    </div>
  )
} 