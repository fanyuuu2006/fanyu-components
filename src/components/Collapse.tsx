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
  const [maxHeight, setMaxHeight] =
    useState<React.CSSProperties["maxHeight"]>("0px");

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (show) {
        setMaxHeight(`${el.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    };

    // 初次執行
    updateHeight();

    // 監聽內容變化
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [show]);

  return (
    <Tag
      ref={innerRef}
      style={{
        overflow: "hidden",
        maxHeight,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Collapse.displayName = "Collapse";
