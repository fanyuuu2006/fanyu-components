import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { flexAlignMap } from "../utils/flex";
import {
  ModalContainerProps,
  onEventHandler,
  onEventHandlerKey,
  onEventHandlerKeys,
} from "../types";
import { StateStylesComponent } from "./StateStylesComponent";
import * as _ from "lodash";

export const useModal = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [scale, setScale] = useState(1);

  const [transformOrigin, setTransformOrigin] =
    useState<React.CSSProperties["transformOrigin"]>("center center");

  const Toggle = () => setIsShow((prev) => !prev);
  const Open = () => setIsShow(true);
  const Close = () => setIsShow(false);
  const Reset = () => {
    setScale(1);
    setTransformOrigin("center center");
  };

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

    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const throttledScale = _.throttle((delta: number) => {
        setScale((prev) => {
          const next = Math.max(prev + delta, 0.5); // 限制縮放範圍
          return next;
        });
      }, 100);

      const handleWheel = (e: WheelEvent) => {
        if (
          e.ctrlKey &&
          modalRef.current &&
          modalRef.current.contains(e.target as Node)
        ) {
          e.preventDefault();
          const delta = e.deltaY > 0 ? -0.7 : 0.4;
          throttledScale(delta);

          const rect = modalRef.current.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
          const x = offsetX / rect.width;
          const y = offsetY / rect.height;
          setTransformOrigin(`${x * 100}% ${y * 100}%`);
        }
      };

      document.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => {
        document.removeEventListener("wheel", handleWheel);
        throttledScale.cancel(); // 清除 throttle 定時器
      };
    }, []);

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
        <div
          ref={modalRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin,
            transition: "transform 0.2s ease",
          }}
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
        </div>
      </StateStylesComponent>
    );

    return ReactDOM.createPortal(Component, document.body);
  };

  Container.displayName = "Modal.Container";

  return {
    Open,
    Close,
    Toggle,
    Reset,
    Container,
  };
};
