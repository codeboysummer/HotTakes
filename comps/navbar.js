import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"3rem"}
        pos={"relative"}
        top={0}
        left={0}
        p={3}
      >
        <Flex cursor={'pointer'}>
          <Image />
          <Link href={'/'}>
            <Heading color={"#f7a110 "}>Hot</Heading>
            </Link>
            <Link href={'/'}>
              <Heading color={"#3ca9e9"}>Takes</Heading>
            </Link>
          
        </Flex>

        <Flex
          w={"30%"}
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
                <Button>Create Takes</Button>
              </Link>
              <Link href={{pathname:`/user/${username}`,
            query:{uid:user.uid}
            }}>
                <Image
                  cursor={"pointer"}
                  borderRadius={"50%"}
                  w={10}
                  src={user?.photoURL}
                />
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
