// Mock PDF page text extractor for the default demo PDF
// Returns short text that represents the page content/topic

export function getMockPageText(fileName: string, pageNumber: number): string | undefined {
  const normalized = fileName.replace(/\s+/g, '');
  const isEmileo = /Emileo|\[IT프로젝트\]Emileo_중간발표PPT/i.test(normalized);
  if (!isEmileo) return undefined;

  const map: Record<number, string> = {
    1: '소개\nEmileo 프로젝트 개요와 목표 소개\n팀 구성/역할 분담, 촬영 범위 안내\n핵심 메시지: 발표 효율을 높이는 AI 보조',
    2: '문제 정의\n시간 관리와 스크립트 준비의 어려움\n슬라이드별 포커스 분산 문제\n인사이트: 시간 초과, 말의 반복',
    3: '솔루션 개요\n슬라이드 기반 대본 자동 생성\n연습-기록-리포트 선순환\n효과: 준비 시간 단축/일관성/시간 초과 방지',
    4: '시스템 아키텍처\nFE(React+Vite), BE(Kotlin/Spring)\nPDF→매핑→스크립트→리포트 파이프라인\n데이터 플로우/보안 고려',
    5: '핵심 기능 데모(대본 자동 작성)\n마법사 버튼으로 템플릿 생성\n생성 후 즉시 편집/슬라이드별 개별 생성\n키워드/길이 가이드',
    6: '연습 모드(시간/표시)\n중앙 타이머/상태바/스크립트 토글\n타이머 클릭: 상태바 숨김+타이머 토글\n슬라이드별 기록 자동 집계',
    7: '결과 리포트\n총 소요/목표 대비/시간 추이 카드\n가장 오래 발표한 슬라이드 대본 미리보기\n예상 질문 TOP5',
    8: '성과 및 기대효과\n준비 시간 30% 감소(가정)\n초과 시간 60% 감소, 반복 40% 감소\n현장 적용 가능성',
    9: '로드맵/마무리\n프롬프트 최적화/화자 톤 옵션\n분석 리포트 자동화/팀 공유·피드백\n데모 및 Q&A',
  };

  return map[pageNumber];
}


