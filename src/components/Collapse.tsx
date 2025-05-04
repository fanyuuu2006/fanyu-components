import { Component, useRef } from "react";
import { CollapseProps } from "../types";

export const Collapse = <Component extends React.ElementType>({
  as,
  state: show,
  className,
  style,
  children,
  ...rest
}: CollapseProps<Component>) => {
  const Tag = as ?? "div";
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <Tag
      ref={innerRef}
      className={`overflow-hidden ${
        className ?? ""
      } transition-[max-height] duration-300`}
      style={{
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
