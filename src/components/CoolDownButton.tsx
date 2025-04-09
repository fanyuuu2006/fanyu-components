import { useState } from "react";
import { CoolDownButtonProps } from "../types/Props";

export const CoolDownButton = <T extends React.ElementType = "button">({
  as,
  children,
  style,
  onClick,
  coolDownTime = 1000,
  enabledStyle,
  disabledStyle,
  ...rest
}: CoolDownButtonProps<T>) => {
  const Component = as || "button";
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);

  const currentStyle = {
    padding: "1em 1.5em",
    ...style,
    ...(isButtonEnabled ? enabledStyle : disabledStyle),
  };

  return (
    <Component
      disabled={!isButtonEnabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setIsButtonEnabled(false);
        onClick?.(e); // 如果有傳入 onClick 函數，則執行它
        setTimeout(() => {
          setIsButtonEnabled(true);
        }, coolDownTime);
      }}
      style={currentStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
