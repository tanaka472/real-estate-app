import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { dummyProperties } from '../data/dummyProperties'

// 物件一覧画面（ダミーデータをカード形式で表示）
export default function PropertyList() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
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

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">家賃：{property.rent.toLocaleString()}円 / 月</p>
            <p className="property-area">エリア：{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
