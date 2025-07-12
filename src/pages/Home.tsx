import { Link, useNavigate } from 'react-router-dom'
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
          gap: '40px',
        }}
      >
        {/* 타이틀 섹션 */}
        <div style={{ width: '100%' }}>
          <TextSection 
            title="발표 연습, 이젠 SpeakON에서 끝내세요!"
            subtitle="파일 업로드하고 발표 연습을 시작해보세요."
          />
        </div>
        
        {/* 파일 업로드 섹션 */}
        <div style={{ width: '100%' }}>
          <FileUploadBox onUploadComplete={handleUploadComplete} />
        </div>
        
        {/* 링크 버튼들 */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginTop: '40px',
        }}>
          <Link 
            to="/page-preview" 
            style={{ 
              color: colors.primary.normal, 
              textDecoration: 'none', 
              fontSize: '16px',
              fontWeight: 500,
              padding: '12px 24px',
              border: `2px solid ${colors.primary.normal}`,
              borderRadius: '8px',
              display: 'inline-block',
              transition: 'all 0.2s ease',
              backgroundColor: colors.background.normal,
              fontFamily: 'Pretendard, sans-serif',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.normal;
              e.currentTarget.style.color = colors.static.white;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.background.normal;
              e.currentTarget.style.color = colors.primary.normal;
            }}
          >
            피그마 디자인 시스템 예시 보기
          </Link>
          <Link 
            to="/modal-page-input" 
            style={{ 
              color: colors.primary.normal, 
              textDecoration: 'none', 
              fontSize: '16px',
              fontWeight: 500,
              padding: '12px 24px',
              border: `2px solid ${colors.primary.normal}`,
              borderRadius: '8px',
              display: 'inline-block',
              transition: 'all 0.2s ease',
              backgroundColor: colors.background.normal,
              fontFamily: 'Pretendard, sans-serif',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.normal;
              e.currentTarget.style.color = colors.static.white;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.background.normal;
              e.currentTarget.style.color = colors.primary.normal;
            }}
          >
            스크립트 입력 폼 예시 보기
          </Link>
        </div>
        
        {/* 디버깅을 위한 임시 텍스트 */}
        <div style={{
          padding: '20px',
          backgroundColor: colors.fill.normal,
          borderRadius: '8px',
          textAlign: 'center',
          color: colors.label.normal,
          fontSize: '14px',
          border: `1px solid ${colors.line.normal}`,
        }}>
          홈 페이지가 성공적으로 로드되었습니다! 👋
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