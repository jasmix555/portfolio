import React from "react";
import { Box, Heading, Text, Wrap } from "@chakra-ui/react";
import BoxComponent from "./Box";
import ThreeJS from "./ThreeJS";
import { motion } from "framer-motion";

export default function MainVis() {
  return (
    <BoxComponent heading="Top" id={"Top"} txtColor={"white"}>
      <Wrap display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <ThreeJS />
        <Box
          position={"absolute"}
          w={"100vw"}
          h={"100vh"}
          top={0}
          left={0}
          zIndex={"-1"}
        ></Box>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <>
            <Box
              color={"white"}
              background={"blackAlpha.700"}
              p={"1.5rem 3rem"}
              borderRadius={"10px"}
              textAlign={"center"}
              w={"fit-content"}
              h={"fit-content"}
              position={"absolute"}
              top={"50%"}
              left={"50%"}
              transform={"translate(-50%,-50%)"}
              zIndex={1}
            >
              <Heading fontSize={"3rem"}>Hi I'm Jason Ng</Heading>
              <Text fontSize={"1.8rem"}>
                An Aspiring Front End Engineer
                <br />
                and this is my Portfolio.
              </Text>
            </Box>
          </>
        </motion.div>
      </Wrap>
    </BoxComponent>
  );
}
