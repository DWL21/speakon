import { useState } from 'react'
import { Typography } from '../components/ui/Typography'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('메시지가 전송되었습니다!')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="contact-page">
      <Typography variant="title1" color="black">
        연락처
      </Typography>
      
      <Card style={{ marginTop: '24px', padding: '24px', maxWidth: '500px' }}>
        <Typography variant="title3" color="black" style={{ marginBottom: '24px' }}>
          문의하기
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input
            label="이름"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          
          <div>
            <Typography variant="body2" color="black" style={{ marginBottom: '8px' }}>
              메시지
            </Typography>
            <textarea
              placeholder="메시지를 입력하세요"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <Button type="submit" variant="primary" size="medium">
            메시지 전송
          </Button>
        </form>
      </Card>
    </div>
  )
} 