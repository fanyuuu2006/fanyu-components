import { useEffect, useRef, useState } from "react";
import { ModalContainerProps } from "../types";

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);
  const containRef = useRef<HTMLDialogElement>(null);

  const Toggle = () => setIsShow((prev) => !prev);
  const Open = () => setIsShow(true);
  const Close = () => setIsShow(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") Close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const Container: React.FC<ModalContainerProps> = (
    props: ModalContainerProps
  ) => {
    const { contentClickClose, children, style, ...rest } = props;
    return (
      <dialog
        ref={containRef}
        open={isShow}
        onClick={(e) => {
          const isBackdrop = e.target === containRef.current;
          if (contentClickClose || isBackdrop) Close();
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
