import { useState } from "react";
import { StateStylesComponentProps } from "../types/ComponentProps";

export const StateStylesComponent = <Component extends React.ElementType>(
  props: StateStylesComponentProps<Component>
): React.JSX.Element => {
  const {
    as = "div",
    style,
    styles,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const Component = as;

  const isEnabled = !("disabled" in rest && rest.disabled);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const currentStyle = {
    ...style,
    ...(isEnabled
      ? {
          ...styles?.enabled,
          ...(isPressed ? styles?.pressed : {}),
          ...(isHovered ? styles?.hover : {}),
          ...(isFocused ? styles?.focus : {}),
        }
      : { ...styles?.disabled }),
  };

  return (
    <Component
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        onClick?.(e);
      }}
      onPointerEnter={(e: React.PointerEvent<HTMLElement>) => {
        setIsHovered(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e: React.PointerEvent<HTMLElement>) => {
        setIsHovered(false);
        setIsPressed(false);
        onPointerLeave?.(e);
      }}
      onPointerDown={(e: React.PointerEvent<HTMLElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId); // 讓 pointerUp 確保會回來
        setIsPressed(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e: React.PointerEvent<HTMLElement>) => {
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        setIsPressed(false);
        onPointerUp?.(e);
      }}
      onFocus={(e: React.FocusEvent<HTMLElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      style={currentStyle}
      {...rest}
    />
  );
};

StateStylesComponent.displayName = "StateStylesComponent";
