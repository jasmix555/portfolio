import BoxComponent from "./Box";
import { Box, Text, Flex } from "@chakra-ui/react";

export default function Archive() {
  return (
    <BoxComponent heading="Archive" id={"Archive"} bgc={"#f5f5f5"}>
      <Flex>
        <Box>
          <Text>
            This is a collection of my works over the years.
            <br />I have been working as a Front End Engineer for 2 years now.
            <br />
            I have working on websites and web applications.
            <br />I have also worked on a wide range of technologies from React,
            HTML , SASS , Javascript and Typescript.
          </Text>
        </Box>
      </Flex>
    </BoxComponent>
  );
}
