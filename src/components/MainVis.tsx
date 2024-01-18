import React from "react";
import BoxComponent from "./Box";
import ThreeJS from "./ThreeJS";
import { motion } from "framer-motion";

export default function MainVis() {
  return (
    <BoxComponent heading="Top" id={"Top"} txtColor={"white"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeJS />
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: "-1",
          }}
        ></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div
            style={{
              color: "white",
              background: "#333",
              padding: "2rem 5rem",
              borderRadius: "10px",
              textAlign: "center",
              width: "fit-content",
              height: "fit-content",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 1,
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
              }}
            >
              Hi I&apos;m Jason Ng
            </h1>
            <p
              style={{
                fontSize: "1.8rem",
              }}
            >
              An Aspiring Front End Engineer
              <br />
              and this is my Portfolio.
            </p>
          </div>
        </motion.div>
      </div>
    </BoxComponent>
  );
}
