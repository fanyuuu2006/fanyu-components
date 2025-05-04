import { Component, useRef } from "react";
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

  return (
    <Tag
      ref={innerRef}
      style={{
        overflow: "hidden",
        maxHeight: show ? `${innerRef.current?.scrollHeight ?? 0}px` : "0px",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Collapse.displayName = "Collapse";
