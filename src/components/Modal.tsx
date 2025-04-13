import { useState } from "react";
import { ModelContainerProps } from "../types/ComponentProps";
import { flexAlignMap } from "../utils/flex";
import React from "react";

export const useModal = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const Toggle = () => setIsShow((prev) => !prev);
  const Open = () => setIsShow(true);
  const Close = () => setIsShow(false);

  const Container = (props: ModelContainerProps) => {
    if (!isShow) return null;

    const {
      direction = "vertical",
      mainAlign = "center",
      crossAlign = "center",
      stopPropagation = true,
      children,
      style,
      ...rest
    } = props;

    const clonedChildren = React.Children.map(
      children,
      (child: React.ReactNode) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
              {
                onClick: (e: React.MouseEvent) => {
                  if (stopPropagation) e.stopPropagation();
                  (child as React.JSX.Element).props?.onClick?.(e);
                },
              }
            )
          : child
    );

    return (
      <div
        style={{
          zIndex: 1080,
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",

          display: "flex",
          flexDirection: direction === "horizon" ? "row" : "column",
          alignItems: flexAlignMap.cross[crossAlign],
          justifyContent: flexAlignMap.main[mainAlign],
          ...style,
        }}
        onClick={Close}
        {...rest}
      >
        {clonedChildren}
      </div>
    );
  };

  return {
    Open,
    Close,
    Toggle,
    Container,
  };
};
