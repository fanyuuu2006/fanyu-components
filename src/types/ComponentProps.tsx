import { OverrideProps } from "../../dist/types/UtilProps";
import {
  AsComponentProps,
  flexAlignProps,
  IconProps,
  StateStylesProps,
} from "./UtilProps";

export type OutsideLinkProps = OverrideProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  {}
>;

export type CoolDownButtonProps<Component extends React.ElementType> =
  AsComponentProps<
    Component,
    {
      coolDownTime?: number;
      styles: Omit<StateStylesProps, "pressed">;
    }
  >;

export type ModelContainerProps = OverrideProps<
  Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
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
