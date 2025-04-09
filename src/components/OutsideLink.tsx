import React from "react";
import { OutsideLinkProps } from "../types/Props";

/**
 * 外部連結組件
 * @param {OutsideLinkProps} props
 */

export const OutsideLink: React.FC<OutsideLinkProps> = ({
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  children,
  ...rest
}: OutsideLinkProps) => {
  return (
    <a {...rest} href={href} target={target} rel={rel}>
      {children ?? href}
    </a>
  );
};
