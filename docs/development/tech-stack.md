# テックスタック

> 最終更新: 2026-04-23

## フロントエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Vite | 5.x | ビルドツール・開発サーバー |
| React | 18.x | UIフレームワーク |
| Tailwind CSS | 3.x | スタイリング |
| lucide-react | 最新 | アイコンライブラリ |
| PostCSS | 8.x | CSS変換 |

## 開発環境

| ツール | バージョン |
|--------|-----------|
| Node.js | 20.x（GitHub Actions）/ 22.x（ローカル） |
| npm | 同梱 |

## カスタム設定

### tailwind.config.js（カスタムカラー）
```js
colors: {
  navy: { 900: '#0A2463' },
  brand: {
    blue:   '#3E92CC',
    cyan:   '#00C2CB',
    orange: '#FF8C42',
  }
}
```

### vite.config.js
```js
base: '/test-ptch-website/'  // GitHub Pages用
```

## コンポーネント構成

```
src/
├── main.jsx
├── App.jsx
├── index.css          — グローバルスタイル・カスタムクラス
└── components/
    ├── Header.jsx     — 固定ヘッダー・スクロール検知・ドロップダウン
    ├── Hero.jsx       — フルスクリーン・ペルソナカード・統計
    ├── TrustBar.jsx   — アニメーションカウンター（IntersectionObserver）
    ├── Services.jsx   — 3サービス + 比較テーブル
    ├── Cases.jsx      — 事例カード3件
    ├── Process.jsx    — 5ステップタイムライン
    ├── JourneyBanner.jsx — AS-IS/TOBE比較ビジュアライゼーション
    ├── Partner.jsx    — パートナー制度セクション
    ├── About.jsx      — 会社概要テーブル
    ├── FAQ.jsx        — アコーディオン（6問）
    ├── Contact.jsx    — フォーム（サービス・予算選択付き）
    └── Footer.jsx     — サイトマップフッター
```
