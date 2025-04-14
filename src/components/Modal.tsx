import { useState } from "react";
import { ModelContainerProps } from "../types/ComponentProps";
import { flexAlignMap } from "../utils/flex";
import React from "react";
import { StateStylesComponent } from "./StateStylesComponent";
import { withStopPropagation } from "../utils/withStopPropagation";

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

    return (
      <StateStylesComponent
        as="div"
        style={{
          zIndex: 1080,
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000",
          opacity: 0.5,

          display: "flex",
          flexDirection: direction === "horizon" ? "row" : "column",
          alignItems: flexAlignMap.cross[crossAlign],
          justifyContent: flexAlignMap.main[mainAlign],
          ...style,
        }}
        onClick={Close}
        {...rest}
      >
        {stopPropagation
          ? React.Children.map(children, (child) =>
              stopPropagation ? withStopPropagation(child) : child
            )
          : children}
      </StateStylesComponent>
    );
  };
  Container.displayName = "Modal.Container";

  return {
    Open,
    Close,
    Toggle,
    Container,
  };
};
