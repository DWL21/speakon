import { Link } from 'react-router-dom'
import { TextSection } from '../components/ui/TextSection'
import { FileUploadBox } from '../components/upload/FileUploadBox'

export function Home() {
  return (
    <div className="home-page">
      <TextSection 
        title="발표 연습, 이젠 SpeakON에서 끝내세요!"
        subtitle="파일 업로드하고 발표 연습을 시작해보세요."
      />
      
      <FileUploadBox />
      
      <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link 
          to="/page-preview" 
          style={{ 
            color: '#3282FF', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: 500,
            padding: '8px 16px',
            border: '1px solid #3282FF',
            borderRadius: '6px',
            display: 'inline-block',
            transition: 'all 0.2s ease'
          }}
        >
          페이지 미리보기 컴포넌트 예시 보기
        </Link>
        <Link 
          to="/modal-page-input" 
          style={{ 
            color: '#3282FF', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: 500,
            padding: '8px 16px',
            border: '1px solid #3282FF',
            borderRadius: '6px',
            display: 'inline-block',
            transition: 'all 0.2s ease'
          }}
        >
          모달 페이지 입력 컴포넌트 예시 보기
        </Link>
      </div>
    </div>
  )
} 