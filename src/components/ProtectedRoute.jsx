import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// 未ログインの場合はログイン画面にリダイレクトするためのラッパーコンポーネント
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="loading">読み込み中...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
