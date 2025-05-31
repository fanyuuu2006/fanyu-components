import { useState } from "react";
import ReactDOM from "react-dom";
import { flexAlignMap } from "../utils/flex";
import { ModalContainerProps } from "../types";
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
      children,
      style,
      ...rest
    } = props;

    const Component = (
      <StateStylesComponent
        as="div"
        style={{
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
          ...style,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            Close();
          }
        }}
        {...rest}
      >
        {children}
      </StateStylesComponent>
    );

    return ReactDOM.createPortal(Component, document.body);
  };

  Container.displayName = "Modal.Container";

  return {
    isShow,
    Open,
    Close,
    Toggle,
    Container,
  };
};
