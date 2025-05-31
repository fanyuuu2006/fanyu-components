import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { flexAlignMap } from "../utils/flex";
import {
  ModalContainerProps,
  onEventHandler,
  onEventHandlerKey,
  onEventHandlerKeys,
} from "../types";

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);
  const containRef = useRef<HTMLDialogElement>(null);

  const Open = () => {
    if (!isShow) {
      containRef.current?.showModal();
      setIsShow(true);
    }
  };

  const Close = () => {
    if (isShow) {
      containRef.current?.close();
      setIsShow(false);
    }
  };

  const Toggle = () => {
    isShow ? Close() : Open();
  };

  const Container = (props: ModalContainerProps) => {
    if (!isShow) return null;

    const { contentClickClose, children, style, ...rest } = props;

    return (
      <dialog
        ref={containRef}
        onClick={(e) => {
          if (contentClickClose || e.target === containRef.current) {
            Close();
          }
        }}
        {...rest}
      >
        {children}
      </dialog>
    );
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
