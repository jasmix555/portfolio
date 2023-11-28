import { ReactNode } from "react";

type BoxProps = {
  id: string;
  children?: ReactNode;
  heading: string;
  txtColor?: string;
  height?: string;
  bgc?: string;
};

function BoxComponent({
  id,
  children,
  heading,
  txtColor,
  height,
  bgc,
}: BoxProps) {
  return (
    <div
      id={id}
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        width: "100vw",
        minHeight: height ? height : "100vh",
        position: "relative",
        backgroundColor: bgc,
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <p
          style={{
            textAlign: "right",
            textDecoration: "underline",
            top: "1rem",
            right: "2rem",
            color: txtColor,
            position: "absolute",
            padding: "1rem 1.4rem",
            fontSize: "1.2rem",
          }}
        >
          {heading}
        </p>
        {children}
      </div>
    </div>
  );
}

export default BoxComponent;
