import { useEffect, useRef, useState } from "react";
import { CollapseProps } from "../types";

export const Collapse = <Component extends React.ElementType>({
  as,
  state: show,
  style,
  children,
  ...rest
}: CollapseProps<Component>) => {
  const Tag = as ?? "div";
  const innerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef<boolean>(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "height" && show) {
        el.style.height = "auto"; // 展開後移除固定高度
      }
    };

    el.addEventListener("transitionend", onTransitionEnd);

    if (show) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = `${el.scrollHeight}px`;
      // 強制重繪，讓上面設定生效
      void el.offsetHeight;
      el.style.height = "0px";
    }
    rendered.current = true;

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [show]);

  return (
    <Tag
      ref={innerRef}
      style={{
        overflow: "hidden",
        ...(!rendered.current ? { height: "0px" } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Collapse.displayName = "Collapse";
