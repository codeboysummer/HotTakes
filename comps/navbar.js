import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { AddIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"3rem"}
        pos={"fixed"}
        top={0}
        left={0}
        p={5}
        zIndex={999}
        bg={"blackAlpha.800"}
      >
        <Flex cursor={"pointer"}>
          <Link href={"/"}>
            <Heading color={"#f7a110 "}>Hot</Heading>
          </Link>
          <Link href={"/"}>
            <Heading color={"#3ca9e9"}>Takes</Heading>
          </Link>
        </Flex>

        <Flex
          w={["60%", "50%", "40%"]}
          alignItems={"center"}
          justifyContent={!username ? "flex-end" : "space-around"}
        >
          {!username && (
            <>
              <Link href={"/enter"}>
                <Button colorScheme={"blue"}>Login</Button>
              </Link>
            </>
          )}
          {username && (
            <>
              <Link href={"/admin/takes"}>
                <IconButton
                  transition={".5s ease"}
                  _hover={{
                    backgroundColor: "black",
                    color: "teal.500",
                  }}
                  isRound
                  mr={2}
                  colorScheme={"gray"}
                  icon={<AddIcon />}
                />
              </Link>
              <Link href={{ pathname: `/user/${username}` }}>
              
                <Tag cursor={'pointer'} size='lg' colorScheme='blue' borderRadius='full'>
  <Avatar
  
    src={user?.photoURL}
    size='xs'
    name={user.username}
    ml={-1}
    mr={2}
  />
  <TagLabel flexShrink={0}>{username}</TagLabel>
</Tag>
              </Link>
              <Link href={"/"}>
                <Button
                  onClick={() => signOut(auth)}
                  colorScheme={"purple"}
                  type="ghost"
                >
                  Logout
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
