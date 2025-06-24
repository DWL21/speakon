import { Button } from '../components/ui/Button'
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
      
      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <Button variant="primary" size="medium">
          시작하기
        </Button>
        <Button variant="outline" size="medium">
          더 알아보기
        </Button>
      </div>
    </div>
  )
} 