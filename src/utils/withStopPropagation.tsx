import React from "react";

/**
 * 攔截指定的事件並自動 stopPropagation
 * @param child React element
 * @param events 要攔截的事件名稱陣列，如 ['onClick', 'onMouseDown']
 */
export const withStopPropagation = (
  child: React.ReactNode
): React.ReactNode => {
  if (!React.isValidElement(child)) return child;

  const newProps: Record<string, any> = {};
  const oldProps: Record<string, any> =
    (child as React.JSX.Element).props || {};

  Object.keys(oldProps).forEach((key) => {
    if (key.startsWith("on") && typeof oldProps[key] === "function") {
      newProps[key] = (e: any) => {
        e.stopPropagation();
        oldProps[key]?.(e);
      };
    }
  });

  return React.cloneElement(child, newProps);
};
