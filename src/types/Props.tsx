import { alignOption, directionOption } from "./Options";

/** 用於重載同名屬性（用於覆蓋類型 T 中與類型 P 相同名稱的屬性，並保留其餘屬性）*/
type OverrideProps<T, P> = Omit<T, keyof P> & P;

/** 支援元件型別*/
type AsComponentProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export type ButtonStylesProps = {
  enabled?: React.CSSProperties; // 啟用時的樣式
  disabled?: React.CSSProperties; // 禁用時的樣式
  hover?: React.CSSProperties; // 鼠標 hover 時的樣式
  active?: React.CSSProperties; // 鼠標點擊時的樣式
};

export type OutsideLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type CoolDownButtonProps<T extends React.ElementType = "button"> =
  OverrideProps<
    AsComponentProps<T>,
    {
      coolDownTime?: number; // 冷卻時間
      styles: ButtonStylesProps;
    }
  >;

export interface ModelContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  direction?: directionOption;
  mainAlign?: alignOption;
  crossAlign?: alignOption;
  stopPropagation?: boolean;
}
