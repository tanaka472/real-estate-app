# 不動産管理アプリ

Supabase認証機能付きの不動産管理Webアプリです。

## 機能

- メールアドレス＋パスワードによる会員登録・ログイン
- ログイン後は物件一覧画面（ダミーデータ）に遷移
- 未ログイン時はログイン画面へリダイレクト
- ログアウト機能

## 技術構成

- React + Vite
- React Router
- Supabase（メール／パスワード認証）

## セットアップ

```bash
npm install
```

プロジェクトルートに `.env` ファイルを作成し、SupabaseのProject URLとPublishable keyを設定してください（`.env.example` を参照）。

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

## 開発サーバー起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```
