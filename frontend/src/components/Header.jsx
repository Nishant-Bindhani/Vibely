import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { MdOutlineSettings } from "react-icons/md";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={"space-between"} mt={"6"} mb={"8"}>
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}
      <Flex>
        <Image
          cursor={"pointer"}
          alt="logo"
          w={9}
          h={9}
          src={colorMode === "dark" ? "/test-white.png" : "/test-removebg1.png"}
          onClick={toggleColorMode}
        />
        <Text
          fontSize={"medium"}
          mt={4}
          fontFamily={"Dancing Script"}
          alignSelf={"flex-end"}
          fontWeight={"700"}
        >
          Vibely
        </Text>
      </Flex>

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>
          <Button size={"xs"} onClick={logout} bg={"inherit"}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign Up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
