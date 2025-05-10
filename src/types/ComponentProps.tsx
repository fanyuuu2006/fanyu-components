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

export type ModelContainerProps = OverrideProps<
  Omit<StateStylesComponentProps<"div">, "onClick">,
  flexAlignProps & {
    stopPropagation?: boolean;
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
      /** 文字內容 */
      children: string;
      /** 每秒字元輸入數（字元/秒） */
      speed?: number;
      /** 開始前延遲 (毫秒) */
      startDelay?: number;
      /** 顯示的游標符號 */
      cursor?: string;
      /** 游標是否閃爍 */
      cursorBlink?: boolean;
      /** 完成時回呼 */
      onComplete?: () => void;
    }
  >;
  