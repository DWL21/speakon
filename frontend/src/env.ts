// 환경변수 타입 정의
interface Env {
  VITE_API_URL?: string;
  VITE_APP_NAME?: string;
}

// 환경변수 가져오기
const env: Env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || '새 프로젝트',
}

export default env 