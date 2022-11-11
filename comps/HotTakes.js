import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChatIcon, DragHandleIcon } from "@chakra-ui/icons";
import UpVoteButton from "./UpVoteButton";
import DownVoteButton from "./DownVoteButton";
import { UserContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";

import Comments from "./Comments";
import {
  collection,
  doc,
  getDocs,
  query,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  Menu,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import MenuBtn from "./MenuBtn";

const HotTakes = ({ take, canComment, takeId, postUsername }) => {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const { username: ourUsername } = useContext(UserContext);
  const [likeCount, setlikeCount] = useState(0);
  const [dislikeCount, setdislikeCount] = useState(0);
  const total = dislikeCount + likeCount;

  const UpVote = async () => {
    if (!user) {
      toast({ title: "please create an account to comment" });
      return;
    }
    try {
      const upVoteDocRef = doc(
        db,
        `posts/${takeId}/upvote/${user.uid.toString()}`
      );
      const downVoteDocRef = doc(
        db,
        `posts/${takeId}/downvote/${user.uid.toString()}`
      );

      const downVoteDoc = await getDoc(downVoteDocRef);
      const upVoteDoc = await getDoc(upVoteDocRef);

      if (downVoteDoc.exists()) {
        await deleteDoc(downVoteDocRef);
        getNumberOfDisLikes();
      }

      if (upVoteDoc.exists()) {
        toast({
          status: "error",
          title: "you already liked this",
          duration: 1000,
        });
        return;
      }

      await setDoc(upVoteDocRef, { exists: true });
      getNumberOfLikes();
      toast({ title: "liked", status: "success", duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };
  const getNumberOfLikes = async () => {
    const collectionRef = collection(db, `posts/${takeId}/upvote/`);
    const q = query(collectionRef);
    const collectionDoc = await getDocs(q);
    console.log("likes", collectionDoc.size);
    return setlikeCount(collectionDoc.size);
  };
  const DownVote = async () => {
    if (!user) {
      toast({ title: "please create an account to comment " });
      return;
    }
    try {
      const upVoteDocRef = doc(
        db,
        `posts/${takeId}/upvote/${user.uid.toString()}`
      );
      const downVoteDocRef = doc(
        db,
        `posts/${takeId}/downvote/${user.uid.toString()}`
      );

      const downVoteDoc = await getDoc(downVoteDocRef);
      const upVoteDoc = await getDoc(upVoteDocRef);

      if (upVoteDoc.exists()) {
        await deleteDoc(upVoteDocRef);
        console.log("upvote exists");
        getNumberOfLikes();
      }

      if (downVoteDoc.exists()) {
        toast({
          status: "error",
          title: "you already liked this",
          duration: 1000,
        });
        return;
      }

      await setDoc(downVoteDocRef, { exists: true });
      getNumberOfDisLikes();

      toast({ title: "disliked", status: "success", duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };
  const getNumberOfDisLikes = async () => {
    const collectionRef = collection(db, `posts/${takeId}/downvote/`);
    const q = query(collectionRef);
    const collectionDoc = await getDocs(q);
    console.log("dislikes", collectionDoc.size);

    return setdislikeCount(collectionDoc.size);
  };
  useEffect(() => {
    getNumberOfDisLikes();
    getNumberOfLikes();
  }, []);

  
  
  return (
    <>
      <VStack>
        <Box padding={2} bg={"black"}>
          <VStack w={"100%"} p={4} bg={"white"} border={"1px solid black"}>
            {/* < IconButton alignSelf={'flex-end'} icon={<DragHandleIcon/>}/> */}
            {postUsername == ourUsername ? (
              <>
                <MenuBtn takeId={takeId} canComment={canComment} />
              </>
            ) : (
              <></>
            )}

            {postUsername && (
              <>
                <Text>
                  <i> @{postUsername}</i>
                </Text>
              </>
            )}

            <Flex
              w={[200, 500, 700]}
              justifyContent={"space-around"}
              alignItems={"center"}
              h={"fit-content"}
            >
              <HStack>
                <Text cursor={"pointer"} onClick={UpVote} fontSize={"3rem"}>
                  👍
                </Text>
                <Stat>
                  <StatNumber>{likeCount}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {likeCount ? ((likeCount / total) * 100).toFixed(1) : "0"}%
                  </StatHelpText>
                </Stat>
              </HStack>
              <Heading w={"70%"} flexWrap={"wrap"} textAlign={"center"}>
                {take}
              </Heading>
              <HStack>
                <Text cursor={"pointer"} onClick={DownVote} fontSize={"3rem"}>
                  👎
                </Text>{" "}
                <Stat>
                  <StatNumber>{dislikeCount}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    {dislikeCount
                      ? ((dislikeCount / total) * 100).toFixed(1)
                      : "0"}
                    %
                  </StatHelpText>
                </Stat>
              </HStack>
            </Flex>
            <Comments takeId={takeId} canComment={canComment} />
            {/* <HStack>
              {canComment && (
                <ChatIcon cursor={"pointer"} onClick={onOpen} w={7} h={7} />
              )}
            </HStack>
            <Drawer
              placement={"bottom"}
              isOpen={isOpen}
              size={"lg"}
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Comments</DrawerHeader>

                <DrawerBody>
                  <HStack>
                    <Input disabled={!user} placeholder="Type here..." />
                    <Button colorScheme={"purple"} disabled={!user}>Post</Button>
                  </HStack>
                </DrawerBody>

                <DrawerFooter>
                  <></>
                </DrawerFooter>
              </DrawerContent>
            </Drawer> */}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default HotTakes;
