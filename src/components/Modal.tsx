import { useState } from "react";
import { ModelContainerProps } from "../types/ComponentProps";
import { flexAlignMap } from "../utils/flex";
import React from "react";
import {
  onEventHandler,
  onEventHandlerKey,
  onEventHandlerKeys,
} from "../types";

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
        {React.Children.map(children, (child: React.ReactNode) => {
          if (!React.isValidElement(child)) return child;

          const changedProps = onEventHandlerKeys.reduce(
            (
              props: Record<onEventHandlerKey, onEventHandler>,
              key: onEventHandlerKey
            ) => {
              const originalHandler: onEventHandler = (
                child as React.JSX.Element
              ).props[key];

              // 如果原始的事件處理器存在，包裝它並添加 stopPropagation 邏輯
              if (typeof originalHandler === "function") {
                props[key] = (...args: any[]) => {
                  const event = args[0];
                  if (
                    event?.stopPropagation instanceof Function &&
                    stopPropagation
                  ) {
                    event.stopPropagation(); // 阻止事件冒泡
                  }
                  originalHandler(...args); // 調用原始事件處理器
                };
              }

              return props;
            },
            {} as Record<onEventHandlerKey, onEventHandler>
          );

          return React.cloneElement(
            child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
            changedProps
          );
        })}
      </div>
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
