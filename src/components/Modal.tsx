import { useState } from "react";
import { ModelContainerProps } from "../types/ComponentProps";
import { flexAlignMap } from "../utils/flex";
import React from "react";
import { StateStylesComponent } from "./StateStylesComponent";

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
        {stopPropagation
          ? React.Children.map(children, (child: React.ReactNode) => {
              if (!React.isValidElement(child)) return child;

              const changedProps: Record<string, any> = {};
              for (const [key, value] of Object.entries(
                (child as React.JSX.Element).props || {}
              )) {
                if (key.startsWith("on") && typeof value === "function") {
                  changedProps[key] = (...args: any[]) => {
                    const event = args[0];
                    if (event?.stopPropagation instanceof Function) {
                      event.stopPropagation();
                    }
                    value(...args);
                  };
                }
              }

              return React.cloneElement(child, changedProps);
            })
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
