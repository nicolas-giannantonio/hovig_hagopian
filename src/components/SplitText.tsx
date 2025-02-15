import React from "react";

interface SplitTextProps {
  children?: string | null;
  splitBy?: "character" | "word" | "line";
  inside?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  children,
  splitBy = "character",
  inside = false,
}) => {
  const text = children ?? "";
  const splitText = (text: string): string[] => {
    switch (splitBy) {
      case "character":
        return text.split("");
      case "word":
        return text.split(" ");
      case "line":
        return text.split("\n");
      default:
        return text.split("");
    }
  };

  const parts = splitText(text);

  return (
    <>
      {parts.map((part, index) => {
        const content = (
          <span className="s__anim" key={index}>
            {part === " " ? "\u00A0" : part}
          </span>
        );
        return inside ? (
          <span className="wrap_s" key={`wrap-${index}`}>
            {content}{" "}
          </span>
        ) : (
          content
        );
      })}
    </>
  );
};

export default SplitText;
