import { supabase } from './supabaseClient'

// 物件一覧を取得する（RLSにより自分が登録した物件のみ取得される）
export async function fetchProperties() {
  return supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
}

// 物件を新規登録する
export async function createProperty({ userId, name, rent, area, layout }) {
  return supabase
    .from('properties')
    .insert({ user_id: userId, name, rent, area, layout })
    .select()
    .single()
}

// 物件を更新する
export async function updateProperty(id, { name, rent, area, layout }) {
  return supabase
    .from('properties')
    .update({ name, rent, area, layout })
    .eq('id', id)
    .select()
    .single()
}

// 物件を削除する
export async function deleteProperty(id) {
  return supabase.from('properties').delete().eq('id', id)
}
