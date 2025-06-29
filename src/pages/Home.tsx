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
    </div>
  )
} 