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
    if (show && innerRef.current) {
      const height = innerRef.current.scrollHeight;
      setMaxHeight(`${height}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [show, children]);

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
