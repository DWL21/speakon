import { Typography } from '../components/ui/Typography'
import { Card } from '../components/ui/Card'

export function About() {
  return (
    <div className="about-page">
      <Typography variant="title1" color="black">
        소개 페이지
      </Typography>
      
      <Card style={{ marginTop: '24px', padding: '24px' }}>
        <Typography variant="title3" color="black" style={{ marginBottom: '16px' }}>
          프로젝트 정보
        </Typography>
        <Typography variant="body1" color="gray500" style={{ marginBottom: '12px' }}>
          이 프로젝트는 React Router를 사용한 기본적인 라우팅 예제입니다.
        </Typography>
        <Typography variant="body2" color="gray500">
          디자인 시스템과 함께 구성되어 있어 빠르게 개발을 시작할 수 있습니다.
        </Typography>
      </Card>
      
      <Card style={{ marginTop: '16px', padding: '24px' }}>
        <Typography variant="title3" color="black" style={{ marginBottom: '16px' }}>
          기술 스택
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><Typography variant="body2" color="gray500">React 18</Typography></li>
          <li><Typography variant="body2" color="gray500">React Router DOM</Typography></li>
          <li><Typography variant="body2" color="gray500">TypeScript</Typography></li>
          <li><Typography variant="body2" color="gray500">Vite</Typography></li>
          <li><Typography variant="body2" color="gray500">디자인 시스템</Typography></li>
        </ul>
      </Card>
    </div>
  )
} 