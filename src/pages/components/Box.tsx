import { ReactNode } from "react";
import { Box, Text, Wrap } from "@chakra-ui/react";

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
    <Wrap
      id={id}
      w={"100vw"}
      minH={height ? height : "100vh"}
      position={"relative"}
      background={bgc}
    >
      <Box w={"100%"} h={"100%"}>
        <Text
          textAlign={"right"}
          p={"1rem 1.4rem"}
          top={"1rem"}
          right={"2rem"}
          textDecor={"underline"}
          color={txtColor}
        >
          {heading}
        </Text>
        {children}
      </Box>
    </Wrap>
  );
}

export default BoxComponent;
