import React from "react";
import { OutsideLinkProps } from "../types/ComponentProps";

/**
 * 外部連結組件，用於建立帶有安全屬性（如 `rel="noopener noreferrer"`）的超連結。
 *
 * 預設會在新分頁中打開連結，並防止安全性問題（如窗口釣魚攻擊）。
 *
 * @param {OutsideLinkProps} props - 傳入標準 HTML `<a>` 屬性與子元素
 * @param {string} props.href - 連結的目標 URL
 * @param {string} [props.target="_blank"] - 連結開啟方式，預設在新分頁開啟
 * @param {string} [props.rel="noopener noreferrer"] - 防止安全漏洞，預設已設置
 * @param {React.ReactNode} props.children - 超連結內的內容
 * @returns {React.JSX.Element} 外部連結元素
 */
export const OutsideLink: React.FC<OutsideLinkProps> = (props: OutsideLinkProps): React.JSX.Element => {
  const {
    href,
    target = "_blank",
    rel = "noopener noreferrer",
    children,
    ...rest
  } = props;
  return (
    <a {...rest} href={href} target={target} rel={rel}>
      {children ?? href}
    </a>
  );
};

OutsideLink.displayName = "OutsideLink";
