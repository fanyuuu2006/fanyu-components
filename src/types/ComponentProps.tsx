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
