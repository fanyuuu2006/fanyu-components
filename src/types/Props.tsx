// 重載屬性
type OverrideProps<T, P> = Omit<T, keyof P> & P;

export type OutsideLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface CoolDownProps {
  coolDownTime?: number; // 冷卻時間
  enabledStyle?: React.CSSProperties; // 啟用時的樣式
  disabledStyle?: React.CSSProperties; // 禁用時的樣式
}

export type CoolDownButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
} & CoolDownProps &
  OverrideProps<
    React.ComponentPropsWithoutRef<T>,
    {
      onClick?: React.ComponentPropsWithoutRef<T>["onClick"];
    }
  >;
