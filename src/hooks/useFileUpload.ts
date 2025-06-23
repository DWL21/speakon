import { useState, useCallback } from 'react'

interface UseFileUploadResult {
  isUploading: boolean
  uploadProgress: number
  uploadedFile: File | null
  error: string | null
  uploadFile: (file: File) => Promise<void>
  resetUpload: () => void
}

export const useFileUpload = (): UseFileUploadResult => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    const maxSizeMB = 50
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    
    if (file.type !== 'application/pdf') {
      return 'PDF 파일만 업로드 가능합니다.'
    }
    
    if (file.size > maxSizeBytes) {
      return `파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`
    }
    
    return null
  }

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    setError(null)
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      await new Promise<void>((resolve, reject) => {
        const interval = setInterval(() => {
          setUploadProgress((prev: number) => {
            if (prev >= 100) {
              clearInterval(interval)
              setIsUploading(false)
              setUploadedFile(file)
              resolve()
              return 100
            }
            return prev + Math.random() * 15
          })
        }, 100)

        setTimeout(() => {
          if (Math.random() > 0.9) {
            clearInterval(interval)
            setIsUploading(false)
            reject(new Error('업로드 중 오류가 발생했습니다. 다시 시도해주세요.'))
          }
        }, 2000)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 실패')
      setUploadProgress(0)
      setIsUploading(false)
    }
  }, [])

  const resetUpload = useCallback(() => {
    setIsUploading(false)
    setUploadProgress(0)
    setUploadedFile(null)
    setError(null)
  }, [])

  return {
    isUploading,
    uploadProgress,
    uploadedFile,
    error,
    uploadFile,
    resetUpload,
  }
} 