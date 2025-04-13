/**
 * 對齊方式
 */
export type alignOption = "start" | "center" | "end";

/**
 * 排列方向
 */
export type directionOption = "horizon" | "vertical";

/**
 * 狀態
 */
export const stateOptions = [
  "enabled",
  "disabled",
  "hover",
  "focus",
  "pressed",
] as const;

export type stateOption = (typeof stateOptions)[number];
