// 디자인 시스템 사용 예시
// 실제 사용시에는 import 경로를 조정해주세요

/*
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { colors } from '../theme/colors';

export const DesignSystemExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Pretendard' }}>
      
      // Typography 사용 예시
      <section style={{ marginBottom: '40px' }}>
        <Typography variant="title1" color="black">
          섹션에서 주제를 나타낼 때
        </Typography>
        
        <Typography variant="title2" color="black">
          서브 섹션 제목
        </Typography>
        
        <Typography variant="body1" color="gray900">
          기본 본문 텍스트입니다. 16px 크기로 표시됩니다.
        </Typography>
        
        <Typography variant="label" color="gray500">
          참고내용을 나타낼 때 사용하는 텍스트
        </Typography>
        
        <Typography variant="caption" color="gray500">
          내부 콘텐츠의 참고내용을 나타낼 때
        </Typography>
      </section>

      // Button 사용 예시
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <Button variant="primary" size="small">
            작은 버튼
          </Button>
          
          <Button variant="primary" size="medium">
            중간 버튼
          </Button>
          
          <Button variant="primary" size="large">
            큰 버튼
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <Button variant="secondary" size="medium">
            보조 버튼
          </Button>
          
          <Button variant="outline" size="medium">
            외곽선 버튼
          </Button>
          
          <Button variant="ghost" size="medium">
            고스트 버튼
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary" size="medium" loading>
            로딩중...
          </Button>
          
          <Button variant="primary" size="medium" disabled>
            비활성화
          </Button>
        </div>
      </section>

      // Input 사용 예시
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input 
            label="제목"
            placeholder="제목을 입력하세요"
          />
          
          <Input 
            label="설명" 
            placeholder="설명을 입력하세요"
            helperText="최대 100자까지 입력 가능합니다"
          />
          
          <Input 
            label="필수 입력"
            placeholder="필수 입력 항목"
            error="필수 입력 항목입니다"
          />
          
          <Input 
            label="비활성화"
            placeholder="입력할 수 없습니다"
            disabled
          />
        </div>
      </section>

      // Card 사용 예시
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Card variant="default" padding="lg">
            <Typography variant="title3" color="black">
              기본 카드
            </Typography>
            <Typography variant="body2" color="gray500">
              기본 스타일의 카드입니다.
            </Typography>
          </Card>
          
          <Card variant="modal" onClick={() => alert('모달 카드 클릭!')}>
            <Typography variant="title3" color="black">
              모달 카드
            </Typography>
            <Typography variant="body2" color="gray500">
              클릭할 수 있는 모달 스타일 카드입니다.
            </Typography>
          </Card>
          
          <Card variant="elevated" padding="xl">
            <Typography variant="title3" color="black">
              그림자 카드
            </Typography>
            <Typography variant="body2" color="gray500">
              그림자가 있는 카드입니다.
            </Typography>
          </Card>
        </div>
      </section>

      // 색상 팔레트
      <section>
        <Typography variant="title2" color="black" style={{ marginBottom: '16px' }}>
          색상 팔레트
        </Typography>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {Object.entries(colors.primary).map(([key, value]) => (
            <div key={key} style={{
              width: '60px',
              height: '60px',
              backgroundColor: value,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '4px',
            }}>
              <Typography variant="caption" color="white">
                {key}
              </Typography>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(colors.neutral).map(([key, value]) => (
            <div key={key} style={{
              width: '60px',
              height: '60px',
              backgroundColor: value,
              borderRadius: '8px',
              border: value === '#FFFFFF' ? '1px solid #EEEEEE' : 'none',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '4px',
            }}>
              <Typography 
                variant="caption" 
                color={value === '#FFFFFF' || value === '#F1F2F5' || value === '#EEEEEE' ? 'black' : 'white'}
              >
                {key}
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
*/

// HTML 파일 분석을 통해 설계된 디자인 시스템:

// 1. 색상 시스템 (theme/colors.ts에 정의됨)
// - Primary: #3282FF (메인 블루)
// - Neutral: 다양한 회색톤 
// - Semantic: 에러, 경고, 성공 색상

// 2. 타이포그래피 시스템 (theme/typography.ts에 정의됨) 
// - Pretendard 폰트 사용
// - Title (22px, 20px, 18px)
// - Body (16px, 14px)
// - Label (13px) - 참고내용용
// - Caption (12px) - 내부 콘텐츠 참고내용용

// 3. 컴포넌트 시스템
// - Button: 4가지 variant (primary, secondary, outline, ghost)
// - Input: 라벨, 에러, 도움말 지원
// - Typography: 의미론적 텍스트 컴포넌트
// - Card: 3가지 variant (default, modal, elevated)

// 4. 간격 시스템 (theme/spacing.ts에 정의됨)
// - 4px부터 64px까지 일정한 간격

export default function DesignSystemInfo() {
  return null; // 실제 컴포넌트는 주석 처리됨
} 