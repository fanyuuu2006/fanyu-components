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
      onPointerEnter={(...args: any[]) => {
        setIsHovered(true);
        onPointerEnter?.(...args);
      }}
      onPointerLeave={(...args: any[]) => {
        setIsHovered(false);
        setIsPressed(false);
        onPointerLeave?.(...args);
      }}
      onPointerDown={(...args: any[]) => {
        args[0].currentTarget.setPointerCapture(args[0].pointerId); // 讓 pointerUp 確保會回來
        setIsPressed(true);
        onPointerDown?.(...args);
      }}
      onPointerUp={(...args: any[]) => {
        const Event = args[0] as React.PointerEvent<HTMLElement>;
        if (Event.currentTarget.hasPointerCapture?.(Event.pointerId)) {
          Event.currentTarget.releasePointerCapture(Event.pointerId);
        }
        setIsPressed(false);
        onPointerUp?.(...args);
      }}
      onFocus={(...args: any[]) => {
        setIsFocused(true);
        onFocus?.(...args);
      }}
      onBlur={(...args: any[]) => {
        setIsFocused(false);
        onBlur?.(...args);
      }}
      style={currentStyle}
      {...rest}
    />
  );
};

StateStylesComponent.displayName = "StateStylesComponent";
