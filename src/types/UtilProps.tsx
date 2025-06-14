import { alignOption, directionOption, stateOption } from "./Options";

/** 分配性的省略屬性 (用於聯集型態)*/
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

/** 用於重載同名屬性（用於覆蓋類型 T 中與類型 P 相同名稱的屬性，並保留其餘屬性*/
export type OverrideProps<T, P> = DistributiveOmit<T, keyof P> & P;

/** 支援元件型別 (可複寫屬性)*/
export type AsComponentProps<
  Component extends React.ElementType,
  PermanentProps extends object = {}
> = OverrideProps<
  React.ComponentProps<Component>,
  {
    /** 指定用於渲染的 React 元件（可為任意元件*/
    as?: Component;
  } & PermanentProps
>;

/** Flex 排版對齊選項*/
export type flexAlignProps = {
  direction?: directionOption;
  mainAlign?: alignOption;
  crossAlign?: alignOption;
};

export type StateStylesProps = Partial<
  Record<stateOption, React.CSSProperties>
>;

/** 圖標屬性（包括圖標和位置*/
export type IconProps = {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const onEventHandlerKeys = [
  "onClick",
  "onMouseDown",
  "onMouseUp",
  "onMouseOver",
  "onMouseOut",
  "onMouseMove",
  "onMouseEnter",
  "onMouseLeave",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerMove",
  "onPointerDown",
  "onPointerUp",
  "onBlur",
  "onFocus",
  "onKeyDown",
  "onKeyUp",
] as const;

export type onEventHandlerKey = (typeof onEventHandlerKeys)[number];
export type onEventHandler = ((...arg: any[]) => void) | undefined;
