import {
  Avatar,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";

import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
  const toast = useToast();

  const { colorMode } = useColorMode();
  const iconHoverColor = useColorModeValue("gray.600", "whiteAlpha.200");

  const currentUser = useRecoilValue(userAtom);

  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        description: "Profile Link Copied",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}> {user.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              color={"gray.300"}
              py={1}
              px={2}
              borderRadius={"full"}
            >
              vibely.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name="default user"
              src={user.profilePic}
              size={{
                base: "lg",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name="default user"
              src="/user.png"
              size={{
                base: "lg",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Text> {user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to={"/update"}>
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}> {user.followers.length} Followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"} />
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          {/* Icon Container with background color and icon color transition */}
          <Box
            className="icon-container"
            _hover={{
              color: useColorModeValue("whiteAlpha.900", "gray.200"),
              bg: iconHoverColor,
            }}
            p={2}
            borderRadius="full"
          >
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box
            className="icon-container"
            _hover={{
              color: useColorModeValue("whiteAlpha.900", "gray.200"),
              bg: iconHoverColor,
            }}
            p={2}
            borderRadius="full"
          >
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={useColorModeValue("whiteAlpha.900", "black")}>
                  <MenuItem
                    bg={useColorModeValue("whiteAlpha.900", "black")}
                    color={useColorModeValue("black", "whiteAlpha.900")}
                    onClick={copyURL}
                    _hover={{
                      color: useColorModeValue("gray.400", "whiteAlpha.600"),
                    }}
                  >
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={`1.5px solid ${
            colorMode === "dark" ? `white` : `black`
          }`}
          justifyContent={"center"}
          pb="2"
          mb={2}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"} fontFamily={"sans-serif"}>
            Your Posts
          </Text>
        </Flex>
        {/* <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex> */}
      </Flex>
    </VStack>
  );
};

export default UserHeader;
