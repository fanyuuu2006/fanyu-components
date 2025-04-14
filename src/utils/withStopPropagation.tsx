import React from "react";

/**
 * 攔截指定的事件並自動 stopPropagation
 * @param child React element
 * @returns React element
 */
export const withStopPropagation = (
  child: React.ReactNode
): React.ReactNode => {
  if (!React.isValidElement(child)) return child;

  const newProps: Record<string, any> = {};
  for (const [key, value] of Object.entries(
    (child as React.JSX.Element).props || {}
  )) {
    if (key.startsWith("on") && typeof value === "function") {
      newProps[key] = (...args: any[]) => {
        const event = args[0];
        if (event?.stopPropagation instanceof Function) {
          event.stopPropagation();
          console.log(key, "有處理到事件冒泡");
        }
        value(...args);
      };
    }
  }

  return React.cloneElement(child, newProps);
};
