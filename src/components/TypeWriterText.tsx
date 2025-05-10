import React, { useEffect, useRef, useState } from "react";
import { TypeWriterTextProps } from "../types";

export const TypeWriterText = React.forwardRef<
  HTMLSpanElement,
  TypeWriterTextProps
>(
  (
    {
      children,
      speed = 20, // 每秒字元數
      startDelay = 0,
      pause = false,
      cursor = "|",
      className = "",
      cursorStyle,
      onComplete,
      shouldDelete = false,
      deleteDelay = 1000,
      loop = false,
      onTyping,
      ...rest
    },
    ref
  ) => {
    const [index, setIndex] = useState<number | null>(null);
    const [action, setAction] = useState<"typing" | "deleting">("typing");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 當文字變化時重置狀態
    useEffect(() => {
      setIndex(null);
    }, [children]);

    useEffect(() => {
      if (pause) return;
      const interval = 1000 / speed;

      if (index === null) {
        // 等待指定時間後開始打字
        timeoutRef.current = setTimeout(() => {
          setIndex(0);
          setAction("typing");
        }, startDelay);
        return;
      }

      if (action === "typing") {
        if (index < children.length) {
          timeoutRef.current = setTimeout(() => {
            setIndex((prev) => {
              const next = (prev ?? -1) + 1;
              if (onTyping && next < children.length) {
                onTyping(children[next-1], next-1);
              }
              return next;
            });
          }, interval);
        } else {
          if (shouldDelete) {
            timeoutRef.current = setTimeout(() => {
              setAction("deleting");
            }, deleteDelay);
          } else {
            onComplete?.();
          }
        }
      }

      if (action === "deleting") {
        if (index > 0) {
          timeoutRef.current = setTimeout(() => {
            setIndex((prev) => (prev ?? 1) - 1);
          }, interval);
        } else {
          if (loop) {
            setIndex(null);
          } else {
            onComplete?.();
          }
        }
      }

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [
      index,
      action,
      children,
      speed,
      pause,
      startDelay,
      deleteDelay,
      shouldDelete,
      loop,
      onTyping,
      onComplete,
    ]);

    return (
      <span ref={ref} className={className} {...rest}>
        {children.slice(0, index ?? 0)}
        {!(
          (action === "typing" && index === children.length) ||
          (action === "deleting" && index === 0)
        ) && (
          <span style={{ display: "inline-block", ...cursorStyle }}>
            {cursor}
          </span>
        )}
      </span>
    );
  }
);

TypeWriterText.displayName = "TypeWriterText";
