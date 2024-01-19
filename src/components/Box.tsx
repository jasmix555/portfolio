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
        width: "100vw",
        minHeight: height ? height : "100vh",
        position: "relative",
        backgroundColor: bgc,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: " 6rem ",
      }}
    >
      <p
        style={{
          textDecoration: "underline",
          top: "1rem",
          left: "2rem",
          color: txtColor,
          position: "absolute",
          padding: "1rem 1.4rem",
          fontSize: "1.2rem",
          zIndex: 1,
        }}
      >
        {heading}
      </p>
      {children}
    </div>
  );
}

export default BoxComponent;
