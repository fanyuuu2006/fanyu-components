import {
  AsComponentProps,
  flexAlignProps,
  IconProps,
  OverrideProps,
  StateStylesProps,
} from "./UtilProps";

export type OutsideLinkProps = OverrideProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  {}
>;

export type StateStylesComponentProps<Component extends React.ElementType> =
  AsComponentProps<Component, { styles?: StateStylesProps }>;

export type CoolDownButtonProps<Component extends React.ElementType> =
  StateStylesComponentProps<Component> & { coolDownTime?: number };

export type ModalContainerProps = OverrideProps<
  Omit<React.HtmlHTMLAttributes<HTMLDialogElement>, "onClick">,
  {
    contentClickClose?: boolean;
  }
>;

export type DownloadButtonProps = OverrideProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  {
    fileName?: string;
    fileUrl: string;
  } & IconProps
>;

export type CollapseProps<Component extends React.ElementType> =
  AsComponentProps<
    Component,
    {
      state: boolean;
    }
  >;

export type TypeWriterTextProps = OverrideProps<
  React.HTMLAttributes<HTMLSpanElement>,
  {
    /**
     * 要顯示的完整文字內容，將依序逐字顯示
     */
    children: string;

    /**
     * 每秒輸入的字元數（字元/秒），預設為 20
     */
    speed?: number;

    /**
     * 是否在輸入完畢後啟用刪除動畫，預設為 false
     */
    shouldDelete?: boolean;

    /**
     * 在輸入完成後等待多少毫秒再開始刪除，預設為 1000 毫秒（建議元件內預設）
     */
    deleteDelay?: number;

    /**
     * 開始輸入前的延遲時間（毫秒），預設為 0
     */
    startDelay?: number;

    /**
     * 是否暫停輸入動畫，為 true 時將停止打字
     */
    pause?: boolean;

    /**
     * 游標字元，會顯示在文字末端，例如 "|" 或 "_"，預設為 "|"
     */
    cursor?: string;

    /**
     * 游標樣式，自訂 CSS 物件（例如改變顏色、粗細等）
     */
    cursorStyle?: React.CSSProperties;

    /**
     * 當文字輸入完成時觸發的回呼函式（不含 loop 模式的刪除階段）
     */
    onComplete?: () => void;

    /**
     * 是否在刪除完成後自動重新開始輸入，預設為 false
     */
    loop?: boolean;

    /**
     * 每輸入一個字元時觸發的回呼函式，可用於播放音效或記錄進度
     * @param currentChar 當前輸入的字元
     * @param currentIndex 當前輸入的字元索引（從 0 開始）
     */
    onTyping?: (currentChar: string, currentIndex: number) => void;
  }
>;
