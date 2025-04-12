import { useState } from "react";
import { DownloadButtonProps } from "../types/ComponentProps";

export const DownloadButton = ({
  children,
  style,
  rel,
  icon,
  iconPosition = "left", // 👈 預設為左側
  fileName,
  fileUrl,
  ...rest
}: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const Icon = icon as React.ElementType;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (fileName && !fileUrl.startsWith("blob:")) {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch(fileUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.download = fileName;
        tempLink.click();

        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("下載失敗", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <a
      download={fileName}
      href={fileUrl}
      onClick={handleClick}
      style={{
        display: "inline-flex", // 為了水平排列 icon 和文字
        alignItems: "center",
        gap: "0.5em",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : "auto",
        ...style,
      }}
      rel={rel ?? "noopener noreferrer"}
      {...rest}
    >
      {Icon && iconPosition === "left" && <Icon />}
      {loading ? "下載中..." : children}
      {Icon && iconPosition === "right" && <Icon />}
    </a>
  );
};
