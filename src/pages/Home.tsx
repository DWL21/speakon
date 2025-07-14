import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { TextSection } from '../components/ui/TextSection'
import { FileUploadBox } from '../components/upload/FileUploadBox'
import { ScriptModal, SlideInput } from '../components/ScriptModal/ScriptModal'
import { colors } from '../theme/colors'

export function Home() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [slides, setSlides] = useState<SlideInput[]>([])

  const handleUploadComplete = (file: File) => {
    console.log('📁 파일 업로드 완료:', file.name);
    setUploadedFile(file)
    // ScriptModal에서 PDF 페이지 수에 맞게 슬라이드를 생성하도록 빈 배열로 초기화
    setSlides([])
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleSlideChange = (slideNumber: number, content: string) => {
    setSlides(prev => 
      prev.map(slide => 
        slide.slideNumber === slideNumber
          ? { ...slide, content }
          : slide
      )
    )
  }

  const handleSave = (savedSlides: SlideInput[]) => {
    console.log('💾 스크립트 저장:', savedSlides.length + '개 슬라이드');
    console.log('저장된 스크립트:', savedSlides)
    console.log('업로드된 파일:', uploadedFile?.name)
    
    // 슬라이드 데이터 업데이트
    setSlides(savedSlides)
    
    // 연습 페이지로 이동하면서 데이터 전달
    if (uploadedFile && savedSlides.length > 0) {
      navigate('/practice', {
        state: {
          pdfFile: uploadedFile,
          slides: savedSlides
        }
      });
    }
    setIsModalOpen(false)
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
      
      // 파일과 대본 데이터 설정
      setUploadedFile(file);
      setSlides(slidesData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('❌ 숨겨진 파일 로드 실패:', error);
      // 대체 알림 방법
      alert('🎯 숨겨진 기능이 발견되었습니다!\n하지만 파일을 로드할 수 없습니다.');
    }
  }

  const renderPreviewContent = () => {
    if (!uploadedFile) return null
    
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        color: colors.label.normal,
      }}>
        <div style={{
          fontSize: '14px',
          color: colors.label.neutral,
          marginBottom: '8px'
        }}>
          업로드된 파일
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: 500,
          color: colors.label.normal
        }}>
          {uploadedFile.name}
        </div>
      </div>
    )
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

      {/* ScriptModal */}
      {uploadedFile && (
        <ScriptModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          pdfFile={uploadedFile}
          slides={slides}
          onSlideChange={handleSlideChange}
          onSave={handleSave}
          renderPreviewContent={renderPreviewContent}
        />
      )}
    </div>
  )
} 