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
  const [height, setHeight] = useState<React.CSSProperties["height"]>("0px");

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "height" && show) {
        setHeight("auto"); // 展開後移除固定高度
      }
    };

    el.addEventListener("transitionend", onTransitionEnd);

    if (show) {
      setHeight(`${el.scrollHeight}px`);
    } else {
      setHeight(`${el.scrollHeight}px`);
      // 強制重繪，讓上面設定生效
      void el.offsetHeight;
      setHeight(`0px`);
    }

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [show]);

  return (
    <Tag
      ref={innerRef}
      style={{
        overflow: "hidden",
        height,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Collapse.displayName = "Collapse";
