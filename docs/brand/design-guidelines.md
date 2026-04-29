# デザインガイドライン

> 最終更新: 2026-04-23

## 1. ブランドコンセプト

**「ともに創り、ともに育てる」**

技術とビジネスの両輪で伴走する「戦略的パートナー」としてのブランド。
単なるベンダーではなく、共創者・仲間という関係性を視覚的に表現する。

---

## 2. カラーパレット

### プライマリカラー

| 名称 | HEX | Tailwind | 用途 |
|------|-----|----------|------|
| Navy | `#0A2463` | `navy-900` | 主背景・見出し |
| Blue | `#3E92CC` | `brand-blue` | グラデーション補助色 |
| Cyan | `#00C2CB` | `brand-cyan` | アクセント（限定使用） |
| Orange | `#FF8C42` | `brand-orange` | CTA・強調 |

### セカンダリカラー

| 名称 | HEX | 用途 |
|------|-----|------|
| White | `#FFFFFF` | テキスト（ダーク背景上） |
| Gray 900 | `#111827` | フッター背景 |
| Gray 600 | `#4B5563` | 本文テキスト |
| Gray 100 | `#F3F4F6` | セクション背景 |

### コントラスト原則

- **ダーク背景（Navy/Blue系）上のテキストは必ず白（`#FFFFFF`）**
- Cyan（`#00C2CB`）はダーク背景での使用を禁止（コントラスト比不足）
- CTAボタン（Orange）のテキストは白のみ使用

---

## 3. タイポグラフィ

### フォントファミリー

```css
font-family: 'Noto Sans JP', 'Inter', sans-serif;
```

| 用途 | フォント | ウェイト |
|------|----------|----------|
| 日本語本文 | Noto Sans JP | 400, 500 |
| 日本語見出し | Noto Sans JP | 700, 900 |
| 英語・数字 | Inter | 600, 700, 800 |

### タイプスケール

| 要素 | サイズ | クラス |
|------|--------|--------|
| Hero H1 | 60–72px | `text-6xl lg:text-7xl font-black` |
| セクション見出し | 32–40px | `section-heading` / `text-3xl md:text-4xl font-black` |
| カード見出し | 18–20px | `text-lg font-black` |
| 本文 | 16px | `text-base` |
| キャプション | 14px | `text-sm` |

---

## 4. コンポーネント定義

### ボタン

```html
<!-- Primary（CTA） -->
<button class="btn-primary">今すぐ無料相談</button>
<!-- → オレンジ背景・白テキスト・角丸Full -->

<!-- Secondary（ダーク背景上） -->
<button class="btn-secondary">資料をダウンロード</button>
<!-- → 白枠・白テキスト・hover で白背景 -->

<!-- Outline（ライト背景上） -->
<button class="btn-outline">詳しく見る</button>
<!-- → Navy枠・Navyテキスト・hover でNavy背景 -->
```

### カード

```html
<div class="card p-6">
  <!-- bg-white, rounded-2xl, shadow-md, hover:shadow-xl, hover:-translate-y-1 -->
</div>
```

### グラデーション背景

```css
/* ヒーロー・ダークセクション */
.gradient-navy {
  background: linear-gradient(135deg, #0A2463 0%, #1040A0 50%, #3E92CC 100%);
}
```

---

## 5. スペーシング・レイアウト

| 用途 | 値 |
|------|-----|
| セクション縦余白 | `py-24` (96px) |
| コンテナ最大幅 | `max-w-7xl` (1280px) |
| コンテナ横余白 | `px-4 sm:px-6 lg:px-8` |
| カード内余白 | `p-6` (24px) |
| グリッドギャップ | `gap-8` (32px) |

---

## 6. アイコン

- **ライブラリ**: `lucide-react`
- **標準サイズ**: 20px（インライン）、24px（カードアイコン）
- **カラー**: コンテナのテキスト色に従う（`currentColor`）

---

## 7. アニメーション

| 種類 | 実装 |
|------|------|
| ホバー浮き上がり | `hover:-translate-y-1 transition-all duration-300` |
| CTAホバー | `hover:-translate-y-0.5 hover:shadow-xl` |
| FAQアコーディオン | ChevronDown `rotate-180` |
| カウンター | IntersectionObserver + setInterval（TrustBar） |
