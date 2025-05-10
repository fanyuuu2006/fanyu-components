import React, { useEffect, useRef, useState } from "react";
import { TypeWriterTextProps } from "../types";

export const TypeWriterText = React.forwardRef<
  HTMLSpanElement,
  TypeWriterTextProps
>(
  (
    {
      children,
      speed = 20, // 以字元/秒為單位，預設為 20 字/秒
      startDelay = 0,
      pause = false,
      cursor = "|",
      className = "",
      cursorStyle,
      onComplete,
      ...rest
    },
    ref
  ) => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isComplete = index === children.length;

    // 每次 children 改變時重置
    useEffect(() => {
      setIndex(0);
    }, [children]);

    useEffect(() => {
      if (pause) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // 延遲起始輸入
      if (index === 0 && startDelay > 0) {
        timeoutRef.current = setTimeout(() => setIndex(1), startDelay);
        return () => clearTimeout(timeoutRef.current!);
      }

      // 開始逐字輸入
      if (!isComplete) {
        const interval = 1000 / speed;
        timeoutRef.current = setTimeout(() => {
          setIndex((prev) => prev + 1);
        }, interval);
        return () => clearTimeout(timeoutRef.current!);
      }

      // 完成後執行 callback
      onComplete?.();
    }, [children, index, speed, startDelay, onComplete, isComplete]);

    return (
      <span ref={ref} className={className} {...rest}>
        {children.slice(0, index)}
        {!isComplete && (
          <span
            style={{
              display: "inline-block",
              ...cursorStyle,
            }}
          >
            {cursor}
          </span>
        )}
      </span>
    );
  }
);

TypeWriterText.displayName = "TypeWriterText";
