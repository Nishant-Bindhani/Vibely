import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
            labore perferendis dolores laborum consequuntur ipsa nesciunt quae
            quidem! Tempora reiciendis doloremque eligendi, consequuntur.
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
