import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '../lib/properties'
import PropertyForm from '../components/PropertyForm'

// 物件一覧画面（Supabaseから取得した自分の物件をカード形式で表示）
export default function PropertyList() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showNewForm, setShowNewForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const loadProperties = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await fetchProperties()

    if (error) {
      setError('物件一覧の取得に失敗しました。' + error.message)
    } else {
      setProperties(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handleCreate = async (values) => {
    const { data, error } = await createProperty({ userId: user.id, ...values })

    if (!error) {
      setProperties((prev) => [data, ...prev])
      setShowNewForm(false)
    }

    return { error }
  }

  const handleUpdate = async (id, values) => {
    const { data, error } = await updateProperty(id, values)

    if (!error) {
      setProperties((prev) => prev.map((p) => (p.id === id ? data : p)))
      setEditingId(null)
    }

    return { error }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    const { error } = await deleteProperty(id)

    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id))
    } else {
      setError('削除に失敗しました。' + error.message)
    }
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          <p className="user-email">{user?.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      <div className="property-toolbar">
        <button
          onClick={() => {
            setShowNewForm((prev) => !prev)
            setEditingId(null)
          }}
        >
          {showNewForm ? '閉じる' : '物件を新規登録'}
        </button>
      </div>

      {showNewForm && (
        <div className="property-card">
          <PropertyForm
            submitLabel="登録"
            onSubmit={handleCreate}
            onCancel={() => setShowNewForm(false)}
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty-state">登録されている物件はまだありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              <div className="property-card" key={property.id}>
                <PropertyForm
                  initialValues={property}
                  submitLabel="更新"
                  onSubmit={(values) => handleUpdate(property.id, values)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="property-card" key={property.id}>
                <h2>{property.name}</h2>
                <p className="property-rent">家賃：{property.rent.toLocaleString()}円 / 月</p>
                <p className="property-area">エリア：{property.area}</p>
                <p className="property-layout">間取り：{property.layout}</p>
                <div className="property-actions">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingId(property.id)
                      setShowNewForm(false)
                    }}
                  >
                    編集
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(property.id)}>
                    削除
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
