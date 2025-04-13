import { useState } from "react";
import { StateStylesComponentProps } from "../types/ComponentProps";

export const StateStylesComponent = <Component extends React.ElementType>(
  props: StateStylesComponentProps<Component>
): React.JSX.Element => {
  const { as, style, styles, onClick, ...rest } = props;

  const Component = (as || "div") as React.ElementType;

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
        setIsPressed((prev) => !prev);
        onClick?.(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={currentStyle}
      {...rest}
    />
  );
};

StateStylesComponent.displayName = "StateStylesComponent";
