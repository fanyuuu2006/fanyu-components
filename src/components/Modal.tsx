import React, { useState } from "react";
import { flexAlignMap } from "../utils/flex";
import {
  ModelContainerProps,
  onEventHandler,
  onEventHandlerKey,
  onEventHandlerKeys,
} from "../types";
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
        as="div"
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
          ? React.Children.map(children, (child: React.ReactNode) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...onEventHandlerKeys.reduce((newProps, key) => {
                      const original = (child as React.JSX.Element).props?.[
                        key
                      ] as onEventHandler;
                      newProps[key] = (...args: any[]) => {
                        const Event = args[0] as React.SyntheticEvent;
                        if (stopPropagation && Event.stopPropagation)
                          Event.stopPropagation();
                        if (typeof original === "function") original(...args);
                      };
                      return newProps;
                    }, {} as Record<onEventHandlerKey, onEventHandler>),
                  })
                : child
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
