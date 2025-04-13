import { alignOption, directionOption, stateOption } from "./Options";

/**分配性的省略屬性 (用於聯集型態) */
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
/**深度合併 */
export type DeepMerge<A, B> = {
  //對 A 和 B 的所有屬性（取聯集，即同時考慮 A 與 B 中的屬性）進行遍歷，鍵名為 K
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] extends object
        ? B[K] extends object
          ? DeepMerge<A[K], B[K]> // 如果 A[K] 和 B[K] 都是物件，則遞歸合併
          : A[K] // 否則取 A[K]
        : A[K] // 如果 A[K] 不是物件，直接取 A[K]
      : A[K] // 如果只有 A 中有此屬性，則取 A[K]
    : K extends keyof B
    ? B[K] // 如果只有 B 中有此屬性，則取 B[K]
    : never;
};

/**分配性的合併屬性 (用於聯集型態) */
export type DistributiveMerge<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

/**用於重載同名屬性（用於覆蓋類型 T 中與類型 P 相同名稱的屬性，並保留其餘屬性）*/
export type OverrideProps<T, P> = DistributiveOmit<T, keyof P> & P;

/**支援元件型別 (深度合併屬性) */
export type AsComponentProps<
  Component extends React.ElementType,
  PermanentProps extends object = {}
> = DeepMerge<
  React.ComponentPropsWithoutRef<Component>,
  {
    /**指定用於渲染的 React 元件（可為任意元件 */
    as?: Component;
  } & PermanentProps
>;

/**Flex 排版對齊選項 */
export type flexAlignProps = {
  direction?: directionOption;
  mainAlign?: alignOption;
  crossAlign?: alignOption;
};

export type StateStylesProps = Partial<
  Record<stateOption, React.CSSProperties>
>;

/**圖標屬性（包括圖標和位置 */
export type IconProps = {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};
