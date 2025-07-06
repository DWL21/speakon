import { Link } from 'react-router-dom'
import { TextSection } from '../components/ui/TextSection'
import { FileUploadBox } from '../components/upload/FileUploadBox'
import { colors } from '../theme/colors'

export function Home() {
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
          <FileUploadBox />
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
    </div>
  )
} 