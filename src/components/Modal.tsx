import React, { useCallback, useEffect, useRef, useState } from "react";
import { ModalContainerProps } from "../types";

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);
  const containRef = useRef<HTMLDialogElement>(null);

  const Open = useCallback(() => {
    containRef.current?.showModal();
    setIsShow(true);
  }, []);

  const Close = useCallback(() => {
    containRef.current?.close();
    setIsShow(false);
  }, []);

  const Toggle = useCallback(() => {
    isShow ? Close() : Open();
  }, [isShow, Open, Close]);

  useEffect(() => {
    const el = containRef.current;
    if (!el) return;

    const handler = () => setIsShow(false);
    el.addEventListener("close", handler);
    return () => el.removeEventListener("close", handler);
  }, []);

  const Container: React.FC<ModalContainerProps> = (
    props: ModalContainerProps
  ) => {
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
