import { useState } from "react";
import { CoolDownButtonProps } from "../types/Props";

/**
 * 一個具備冷卻時間的按鈕組件，可用於防止重複點擊事件。
 *
 * 支援客製化傳入的組件類型，
 * 並根據冷卻時間自動禁用並重新啟用。
 *
 * @template T - 組件類型，預設為 "button"，可傳入其他 React 組件。
 *
 * @param {CoolDownButtonProps<T>} props - 組件的所有屬性
 * @param {T} [props.as] - 要渲染的組件類型
 * @param {React.ReactNode} props.children - 子元件內容
 * @param {React.CSSProperties} [props.style] - 通用樣式
 * @param {number} [props.coolDownTime=1000] - 冷卻時間 ms，預設為 1000
 * @param {React.CSSProperties} [props.enabledStyle] - 啟用狀態的樣式
 * @param {React.CSSProperties} [props.disabledStyle] - 禁用狀態的樣式
 * @param {Function} [props.onClick] - 點擊事件處理器
 * @returns {JSX.Element} 冷卻按鈕的 JSX 元素
 */
export const CoolDownButton = <T extends React.ElementType = "button">({
  as,
  children,
  style,
  onClick,
  coolDownTime = 1000,
  enabledStyle,
  disabledStyle,
  ...rest
}: CoolDownButtonProps<T>) => {
  const Component = as || "button";
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);

  const currentStyle = {
    padding: "1em 1.5em",
    ...style,
    ...(isButtonEnabled ? enabledStyle : disabledStyle),
  };

  return (
    <Component
      disabled={!isButtonEnabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setIsButtonEnabled(false);
        onClick?.(e); // 如果有傳入 onClick 函數，則執行它
        setTimeout(() => {
          setIsButtonEnabled(true);
        }, coolDownTime);
      }}
      style={currentStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
