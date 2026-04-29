# デプロイ手順

> 最終更新: 2026-04-23

## 概要

GitHub Actions を使い、`main` ブランチへのプッシュで自動ビルド・デプロイ。

```
Push to main
    → GitHub Actions: npm ci → npm run build
    → dist/ を GitHub Pages へデプロイ
    → https://cazy06.github.io/test-ptch-website/ に公開
```

## ローカル開発

```bash
# 依存関係インストール
npm install

# 開発サーバー起動（port 3456）
npm run dev

# 本番ビルド確認
npm run build && npm run preview
```

## GitHub Actions ワークフロー

`.github/workflows/deploy.yml`

- **トリガー**: `main` ブランチへのプッシュ、または手動実行
- **環境**: `ubuntu-latest` / Node 20
- **ビルド**: `npm ci` → `npm run build`
- **デプロイ**: `actions/deploy-pages@v4`

## 本番環境への反映手順

1. ローカルで変更・確認
2. `git add` → `git commit` → `git push origin main`
3. GitHub Actions の進捗を確認: https://github.com/cazy06/test-ptch-website/actions
4. 2〜3分後に公開URLで確認

## 環境変数・シークレット

| 名前 | 用途 | 設定場所 |
|------|------|---------|
| `GITHUB_TOKEN` | Pages デプロイ権限 | GitHub Actions 自動付与 |

## トラブルシューティング

| 症状 | 原因 | 対処 |
|------|------|------|
| Actions が失敗する | Node バージョン不一致 | `node-version: 20` を確認 |
| ページが真っ白 | `base` パスのミス | `vite.config.js` の `base` を確認 |
| CSSが崩れる | Tailwind パージ漏れ | `tailwind.config.js` の `content` パスを確認 |
