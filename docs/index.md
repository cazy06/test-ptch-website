# PonoTech Web プロダクトドキュメント

> ポノテク株式会社 コーポレートサイト リニューアルプロジェクトの設計・運用ドキュメント集

## ドキュメント構成

| カテゴリ | 内容 |
|----------|------|
| [ブランド・デザインガイドライン](brand/design-guidelines.md) | カラー・タイポグラフィ・コンポーネント定義 |
| [ペルソナ](product/personas.md) | 3つのターゲットペルソナ詳細 |
| [ジャーニーマップ](product/journey-maps.md) | AS-IS / TOBE ジャーニーマップ |
| [UX要件定義](product/ux-requirements.md) | UI要件・コンテンツ要件・優先度 |
| [コンテンツマップ](content/content-map.md) | 現行サイト vs 新サイト比較・ギャップ分析 |
| [サイト構造・IA](content/site-structure.md) | 情報設計・ナビゲーション構造 |
| [テックスタック](development/tech-stack.md) | 技術構成・開発環境 |
| [デプロイ手順](development/deployment.md) | GitHub Actions・GitHub Pages 運用 |
| [変更履歴](changelog.md) | 更新ログ |

## プロジェクト概要

- **サイトURL（本番）**: https://www.ponotech.net/
- **開発プレビュー**: https://cazy06.github.io/test-ptch-website/
- **リポジトリ**: https://github.com/cazy06/test-ptch-website
- **技術スタック**: Vite 5 + React 18 + Tailwind CSS v3

## クイックリファレンス

### ブランドカラー
| 用途 | カラー | HEX |
|------|--------|-----|
| Primary | Navy | `#0A2463` |
| Secondary | Blue | `#3E92CC` |
| Accent | Cyan | `#00C2CB` |
| CTA | Orange | `#FF8C42` |

### 開発コマンド
```bash
npm run dev    # 開発サーバー起動（port 3456）
npm run build  # 本番ビルド
npm run preview # ビルドプレビュー
```
