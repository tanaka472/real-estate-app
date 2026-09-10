import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// パスワード再設定メールの送信画面
export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { resetPasswordForEmail } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    const { error } = await resetPasswordForEmail(email)

    setSubmitting(false)

    if (error) {
      setError('メールの送信に失敗しました。' + error.message)
      return
    }

    setMessage('パスワード再設定用のリンクをメールで送信しました。メール内のリンクからパスワードを再設定してください。')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>パスワードをお忘れの方</h1>

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}
        {message && <p className="info-message">{message}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? '送信中...' : '再設定メールを送信'}
        </button>

        <p className="auth-switch">
          <Link to="/login">ログイン画面に戻る</Link>
        </p>
      </form>
    </div>
  )
}
