import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { flexAlignMap } from "../utils/flex";
import {
  ModalContainerProps,
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


  const Container = (props: ModalContainerProps) => {
    if (!isShow) return null;

    const {
      direction = "vertical",
      mainAlign = "center",
      crossAlign = "center",
      stopPropagation = true,
      backgroundScroll = false,
      children,
      style,
      ...rest
    } = props;

    const baseStyle = {
      zIndex: 6987,
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      flexDirection: direction === "horizon" ? "row" : "column",
      alignItems: flexAlignMap.cross[crossAlign],
      justifyContent: flexAlignMap.main[mainAlign],
    };

    useEffect(() => {
      if (isShow && !backgroundScroll) {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = original;
        };
      }
    }, [isShow, backgroundScroll]);

    const Component = (
      <StateStylesComponent
        as="div"
        style={Object.assign({}, baseStyle, style)}
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

    return ReactDOM.createPortal(Component, document.body);
  };

  Container.displayName = "Modal.Container";

  return {
    Open,
    Close,
    Toggle,
    Container,
  };
};
