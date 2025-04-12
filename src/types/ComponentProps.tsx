import {
  AsComponentProps,
  flexAlignProps,
  StateStylesProps,
} from "./UtilProps";

export type OutsideLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type CoolDownButtonProps<Component extends React.ElementType> =
  AsComponentProps<
    Component,
    {
      coolDownTime?: number;
      styles: Omit<StateStylesProps, "pressed">;
    }
  >;

export type ModelContainerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onClick"
> &
  flexAlignProps & {
    stopPropagation?: boolean;
  };
