# Fanyu Components

[![npm version](https://img.shields.io/npm/v/fanyucomponents.svg)](https://www.npmjs.com/package/fanyucomponents)
[![license](https://img.shields.io/npm/l/fanyucomponents.svg)](./LICENSE)

✨ Fanyu Components 是一款以 純邏輯為核心、無樣式綁定 的 React 元件套件，專為自由度與擴充性設計。它提供了一些常見的 UI 元件及互動邏輯，並允許開發者完全控制樣式，適用於各種專案與 Design System 的建立。

## 🔧 適用場景

- 希望自由客製樣式的開發者
- 需要通用型互動邏輯元件（如：冷卻按鈕、彈窗容器）
- 建立 Design System 或專案通用元件庫
- 專注於邏輯與功能的開發者

## 🌟 功能特色

- ✅ 無樣式綁定：所有元件都專注於功能邏輯，開發者可以完全掌控 UI 呈現，適用於各種樣式庫（如 Tailwind CSS、Styled Components、Emotion 等）。

- ✅ 高度可擴展性：支援 as props，讓你能靈活地使用不同的 HTML 元素或自定義元件，無需改動原有的邏輯。

- ✅ 支援常見交互邏輯：如冷卻時間按鈕、彈窗控制、外部連結安全處理等。

- ✅ 完整的型別定義：TypeScript 型別支持，讓開發過程更加順暢與安全。

- ✅ 小巧且高效：不含多餘的樣式或依賴，專注於功能，讓你的專案保持輕量。

## 📦 安裝方式

```bash
npm install fanyucomponents
```

## 🛠️ 使用範例

你可以自定義和擴展元件屬性，以便它們更適合你的需求：

```tsx
import { AsComponentProps } from "fanyucomponents";

type CustomComponentProps<Component extends React.ElementType> =
  AsComponentProps<Component, { customProp: string }>;

// 使用 as props 定義自定義組件
const CustomComponent = <Component extends React.ElementType>({
  as,
  customProp,
  ...props
}: CustomComponentProps<Component>) => {
  const Component = as;
  return <Component {...props}>{customProp}</Component>;
};
```

## 🤝 貢獻

我們歡迎來自開發者社群的貢獻！如果您有任何想法或發現問題，請隨時提交 [Issue](https://github.com/fanyuuu2006/fanyu-components/issues)，或是創建 [Pull Request](https://github.com/fanyuuu2006/fanyu-components/pulls)。
