# 開発規約・命名ルール

本プロジェクト（Vite 5 + React 18 + Tailwind CSS v3）における最低限の開発規約をまとめる。

---

## ディレクトリ構成

```
site-react/
├── public/           # 静的ファイル（favicon, logo.svg, .nojekyll など）
├── src/
│   ├── components/   # 再利用可能な UI コンポーネント
│   ├── sections/     # ページセクション単位のコンポーネント（将来的な分割用）
│   ├── App.jsx       # ルートコンポーネント
│   ├── main.jsx      # エントリーポイント
│   └── index.css     # グローバルスタイル（Tailwind ディレクティブ）
├── docs/             # MkDocs ソース（Markdown）
└── docs-site/        # MkDocs ビルド出力（Git 管理外）
```

---

## ファイル命名規則

| 対象 | ルール | 例 |
|------|--------|-----|
| React コンポーネント | **PascalCase** + `.jsx` | `Hero.jsx`, `TrustBar.jsx` |
| ユーティリティ・フック | **camelCase** + `.js` / `.jsx` | `useScrollPosition.js` |
| スタイルシート | **kebab-case** + `.css` | `extra.css` |
| Markdown ドキュメント | **kebab-case** + `.md` | `tech-stack.md`, `journey-maps.md` |
| 静的アセット | **kebab-case** | `persona-a.jpg`, `logo.svg` |

---

## コンポーネント命名規則

```jsx
// ✅ Good
export default function HeroSection() { ... }
export default function ContactForm() { ... }

// ❌ Bad
export default function heroSection() { ... }   // 小文字始まり
export default function hero_section() { ... }  // スネークケース
```

- **1 ファイル = 1 デフォルトエクスポート**を原則とする
- Props が多い場合は型コメントを冒頭に記載する

```jsx
/**
 * @param {{ title: string, items: string[], variant: 'primary'|'secondary' }} props
 */
export default function FeatureCard({ title, items, variant = 'primary' }) { ... }
```

---

## CSS / Tailwind 規則

- スタイルは**Tailwind ユーティリティクラスを優先**する
- カスタムクラスが必要な場合は `src/index.css` に `@layer components` で定義する

```css
@layer components {
  .btn-primary {
    @apply bg-blue-900 text-white font-bold px-6 py-3 rounded-full
           hover:bg-blue-800 transition-colors;
  }
  .btn-outline {
    @apply border-2 border-blue-900 text-blue-900 font-bold px-6 py-3 rounded-full
           hover:bg-blue-900 hover:text-white transition-colors;
  }
}
```

- インラインスタイル（`style={{}}`）は**原則禁止**。どうしても必要な場合はコメントで理由を記載する
- レスポンシブ: `sm:` → `md:` → `lg:` の順で記述する（モバイルファースト）

---

## 変数・関数命名規則

| 対象 | ルール | 例 |
|------|--------|-----|
| 変数・定数（ローカル） | **camelCase** | `navItems`, `scrolled`, `menuOpen` |
| 定数（モジュールレベル） | **UPPER_SNAKE_CASE** | `MAX_ITEMS`, `BASE_URL` |
| イベントハンドラ | `handle` プレフィックス + **camelCase** | `handleSubmit`, `handleMenuToggle` |
| ブール値 | `is` / `has` / `should` プレフィックス | `isOpen`, `hasError`, `shouldScroll` |
| 配列・リスト | 複数形 | `items`, `navLinks`, `personas` |

---

## Git コミットメッセージ規則

**フォーマット**: `<type>: <日本語の概要>`

| type | 用途 |
|------|------|
| `feat` | 新機能・新コンポーネントの追加 |
| `fix` | バグ修正 |
| `style` | デザイン・CSS 調整（機能変更なし） |
| `docs` | ドキュメント（Markdown）の追加・更新 |
| `refactor` | リファクタリング（動作変更なし） |
| `chore` | ビルド設定・依存関係の更新 |
| `ci` | GitHub Actions・デプロイ設定の変更 |

**例:**

```
feat: パートナー制度セクションを追加
fix: ヒーローの水色テキストを白に修正
style: ナビゲーションのドロップダウン表示を調整
docs: ジャーニーマップにスクロール対応を追加
chore: Tailwind を v3.4 にアップデート
```

- 1行目は**50文字以内**を目安にする
- 複数の変更がある場合は本文（空行区切り）に箇条書きで補足する

---

## ブランチ運用

| ブランチ | 用途 |
|----------|------|
| `main` | 本番デプロイ用（GitHub Pages へ自動デプロイ） |
| `feature/<機能名>` | 新機能開発 |
| `fix/<修正内容>` | バグ修正 |
| `docs/<ドキュメント名>` | ドキュメント更新 |

- `main` への直接プッシュは**避ける**（レビュー後にマージ）
- PR のタイトルはコミットメッセージ規則に準ずる

---

## 画像・アセット規則

| 項目 | ルール |
|------|--------|
| 形式 | 写真は **JPEG**（quality 85）、ロゴ・アイコンは **SVG** |
| サイズ | ブログ・事例サムネイル: 1200×654px（16:9）|
| ファイル名 | `kebab-case`（日本語ファイル名禁止） |
| 配置 | `public/` 以下（ビルド後も同パスで参照可能）|
| パス記述 | GitHub Pages ベースパスを含める: `/test-ptch-website/画像名` |
