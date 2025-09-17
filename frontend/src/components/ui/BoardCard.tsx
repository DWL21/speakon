import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SlideInput } from '../ScriptModal/ScriptModalForm'
import { getFileBlob } from '../../lib/fileStore'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { StoredFileMeta } from '../../lib/boardStorage'

export type BoardCardProps = {
  file: StoredFileMeta
  onDelete?: (id: string) => void
}

export const BoardCard: React.FC<BoardCardProps> = ({ file, onDelete }) => {
  const navigate = useNavigate()

  const formatDateFixed = (d: Date) => {
    const yy = String(d.getFullYear() % 100).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const h = d.getHours()
    const ampm = h >= 12 ? '오후' : '오전'
    const hh12 = h % 12 === 0 ? 12 : h % 12
    const hh = String(hh12).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    return `${yy}.${mm}.${dd} ${ampm} ${hh}:${min}`
  }

  const uploadedDate = formatDateFixed(new Date(file.uploadedAt))

  const handleOpen = async () => {
    try {
      // 우선 IndexedDB에서 실제 업로드 파일을 찾음
      const fileBlob = await getFileBlob(file.id)
      if (fileBlob) {
        navigate('/practice', { state: { pdfFile: fileBlob, slides: [] as SlideInput[] } })
        return
      }
      // 없으면 모킹 리소스로 폴백
      const [pdfResponse, scriptsResponse] = await Promise.all([
        fetch('/[IT프로젝트]Emileo_중간발표PPT.pdf'),
        fetch('/example-scripts.json')
      ])
      if (!pdfResponse.ok) throw new Error('PDF not found')
      const blob = await pdfResponse.blob()
      const pdfFile = new File([blob], file.name || '[IT프로젝트]Emileo_중간발표PPT.pdf', { type: 'application/pdf', lastModified: Date.now() })
      let slides: SlideInput[] = []
      if (scriptsResponse.ok) {
        const data = await scriptsResponse.json()
        slides = (data?.slides as SlideInput[]) || []
      }
      navigate('/practice', { state: { pdfFile, slides } })
    } catch (e) {
      alert('파일을 여는 중 문제가 발생했습니다.')
    }
  }

  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'transparent',
        padding: '27px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      <div onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '51px',
            background: '#ECF3FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0986 4.00488C10.3276 4.02757 10.5429 4.12883 10.707 4.29297L12.4141 6H21L21.1025 6.00488C21.6067 6.05621 22 6.48232 22 7V17C22 18.6569 20.6569 20 19 20H5C3.39489 20 2.08421 18.7394 2.00391 17.1543L2 17V5L2.00488 4.89746C2.05621 4.39333 2.48232 4 3 4H10L10.0986 4.00488Z" fill="#3282FF" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ ...typography.title[3], color: colors.label.normal }}>{file.name}</div>
          <div style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '13px', color: colors.label.neutral }}>{uploadedDate}</div>
        </div>
      </div>
      <div style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <details>
          <summary
            style={{
              ...typography.button[2],
              listStyle: 'none', cursor: 'pointer', color: colors.label.neutral,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.00978 10.499C5.8382 10.499 6.50978 11.1706 6.50978 11.999V12.0088C6.50978 12.8372 5.8382 13.5088 5.00978 13.5088H5.00001C4.17169 13.5087 3.50001 12.8371 3.50001 12.0088V11.999C3.50001 11.1707 4.17169 10.4992 5.00001 10.499H5.00978ZM12.0098 10.499C12.8382 10.499 13.5098 11.1706 13.5098 11.999V12.0088C13.5098 12.8372 12.8382 13.5088 12.0098 13.5088H12C11.1717 13.5087 10.5 12.8371 10.5 12.0088V11.999C10.5 11.1707 11.1717 10.4992 12 10.499H12.0098ZM19.0098 10.499C19.8382 10.499 20.5098 11.1706 20.5098 11.999V12.0088C20.5098 12.8372 19.8382 13.5088 19.0098 13.5088H19C18.1717 13.5087 17.5 12.8371 17.5 12.0088V11.999C17.5 11.1707 18.1717 10.4992 19 10.499H19.0098Z" fill="#7D7E83" />
            </svg>
          </summary>
          <div
            style={{
              position: 'absolute',
              right: 0,
              marginTop: '6px',
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '0 16px',
              minWidth: '180px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '1px 2px 4px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}
          >
            <button
              onClick={() => onDelete?.(file.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: colors.label.normal,
                fontFamily: 'Pretendard, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '16px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 9.16667V14.1667" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"/>
                <path d="M8.33333 9.16667V14.1667" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"/>
                <path d="M5 5.83333V15.8333C5 16.7538 5.74619 17.5 6.66667 17.5H13.3333C14.2538 17.5 15 16.7538 15 15.8333V5.83333" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"/>
                <path d="M3.33333 5.83333H16.6667" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"/>
                <path d="M5.83333 5.83333L7.5 2.5H12.5L14.1667 5.83333" stroke="#292929" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"/>
              </svg>
              파일 삭제
            </button>
          </div>
        </details>
      </div>
    </div>
  )
}


