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
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const showToast = useShowToast();

  const [updating, setUpdating] = useState(false);

  const { colorMode } = useColorMode();
  const iconHoverColor = useColorModeValue("gray.600", "whiteAlpha.200");

  const currentUser = useRecoilValue(userAtom); //logged in user

  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please Login to Follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

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
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name="Mark Zuckerberg"
              src={user.profilePic}
              size={{
                base: "lg",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name="Mark Zuckerberg"
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
          {/*client side routing not refreshing */}
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
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
