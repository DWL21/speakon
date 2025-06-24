import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { ButtonSvg } from '../components/ButtonSvg'
import { Typography } from '../components/ui/Typography'

export function Home() {
  return (
    <div className="home-page">
      <Typography variant="title1" color="black">
        홈 페이지
      </Typography>
      <Typography variant="body1" color="gray500" style={{ marginTop: '16px' }}>
        React Router 예제 프로젝트에 오신 것을 환영합니다!
      </Typography>
      
      <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/about">
            <Button variant="primary" size="medium">
              시작하기
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="medium">
              더 알아보기
            </Button>
          </Link>
        </div>
        
        <div style={{ marginTop: '24px' }}>
          <Typography variant="body2" color="gray500" style={{ marginBottom: '12px' }}>
            SVG 버튼 컴포넌트 예제
          </Typography>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ButtonSvg 
              onClick={() => alert('SVG 버튼 클릭!')} 
              title="SVG 버튼"
            />
            <ButtonSvg 
              width={90} 
              height={40} 
              onClick={() => alert('큰 SVG 버튼 클릭!')} 
              title="큰 SVG 버튼"
            />
            <ButtonSvg 
              width={50} 
              height={25} 
              onClick={() => alert('작은 SVG 버튼 클릭!')} 
              title="작은 SVG 버튼"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 