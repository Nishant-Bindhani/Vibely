import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModePreference,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsCheck2All } from "react-icons/bs";
import userAtom from "../atoms/userAtom";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  const colourMode = useColorMode();

  console.log("selectedConversation", selectedConversation);
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          username: user.username,
          userProfilePic: user.profilePic,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? colourMode === "light"
            ? "gray.600"
            : "gray.dark"
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <Box>
              <BsCheck2All size={16} />
            </Box>
          ) : (
            ""
          )}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill size={16} />}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
