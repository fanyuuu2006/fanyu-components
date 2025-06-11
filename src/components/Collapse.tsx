import { useLayoutEffect, useRef, useState } from "react";
import { CollapseProps } from "../types";

export const Collapse = <Component extends React.ElementType = "div">({
  as,
  state: show,
  style,
  children,
  ...rest
}: CollapseProps<Component>) => {
  const Tag = as ?? "div";
  const innerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState<boolean>(show);
  const transitionTimerRef = useRef<number>(null);
  const resizeObserverRef = useRef<ResizeObserver>(null);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // 清理函数
    const cleanup = () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };

    // 處理過度結束
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "height" && show) {
        el.style.height = "auto";
        // 添加防抖重置以防内容变化
        resizeObserverRef.current = new ResizeObserver(() => {
          el.style.height = "auto";
        });
        resizeObserverRef.current.observe(el);
      }
    };

    // 備用（防止 transitionend 未觸發）
    const startFallbackTimer = () => {
      transitionTimerRef.current = setTimeout(() => {
        if (show) {
          el.style.height = "auto";
        }
      }, parseInt(getComputedStyle(el).transitionDuration || "500")); // 匹配 CSS 过渡时间
    };

    if (show) {
      setCollapsed(true);
      el.style.height = "0px";
      // 強制重繪，讓上面設定生效
      void el.offsetHeight;
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = `${el.scrollHeight}px`;
      // 強制重繪，讓上面設定生效
      void el.offsetHeight;
      el.style.height = "0px";
    }

    el.addEventListener("transitionend", onTransitionEnd);
    startFallbackTimer();

    return () => {
      cleanup();
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [show]);
  return (
    <Tag
      ref={innerRef}
      style={{
        overflow: "hidden",
        maxHeight: !collapsed && !show ? "0px" : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Collapse.displayName = "Collapse";
