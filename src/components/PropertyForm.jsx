import { useState } from 'react'

// 物件の新規登録・編集で共通利用するフォーム
export default function PropertyForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { error } = await onSubmit({
      name,
      rent: Number(rent),
      area,
      layout,
    })

    setSubmitting(false)

    if (error) {
      setError('保存に失敗しました。' + error.message)
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">物件名</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="rent">家賃（円）</label>
        <input
          id="rent"
          type="number"
          min="0"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="area">エリア</label>
        <input
          id="area"
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="layout">間取り</label>
        <input
          id="layout"
          type="text"
          placeholder="例：1LDK"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
