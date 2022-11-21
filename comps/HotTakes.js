import React, { useContext, useState, useEffect } from "react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ScaleFade,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
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
import {
  ChatIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";
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
  updateDoc,
} from "firebase/firestore";
import {
  Menu,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import MenuBtn from "./MenuBtn";
import HotTakeLayout from "./HotTakeLayout";
import { animate, motion } from "framer-motion";

const HotTakes = ({ take, canComment, takeId, postUsername }) => {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const [formValue, setformValue] = useState(take);
  const { username: ourUsername } = useContext(UserContext);
  const [likeCount, setlikeCount] = useState(0);
  const [dislikeCount, setdislikeCount] = useState(0);
  const [isEditable, setisEditable] = useState(false);

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
  const editTake = async () => {
    try {
      const docRef = doc(db, `posts/${takeId}`);
      if (formValue.length == 0)
        return toast({
          title: "your take cannot be empty",
          duration: 2000,
          status: "error",
        });
      if (formValue == take) return;
      await updateDoc(docRef, { take: formValue });
      toast({ title: "updated", duration: 2000, status: "success" });
      setisEditable(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNumberOfDisLikes();
    getNumberOfLikes();
  }, []);
  const isEditableVariant={
    initial:{
opacity:0,y:-20,scale:.7
    },
    animate:{
      opacity:1,y:0,scale:1

    },
    transition:{
ease:'easeOut'
    },

    
  }

  return (
    <>
      <>
        <VStack>
          <HotTakeLayout likeCount={likeCount} total={total} dislikeCount={dislikeCount} >
            <VStack
            as={motion.div}
        
              p={1}
              w={"100%"}
              layout
        
            >
              {postUsername == ourUsername ? (
                <>
                  <MenuBtn
                    setisEditable={setisEditable}
                    takeId={takeId}
                    canComment={canComment}
                  />
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
                w={[300, 350, 400, 500, 700]}
                justifyContent={"space-around"}
                alignItems={"center"}
                h={"fit-content"}
              >
                <HStack>
                  <Text
                  as={motion.p}
                  whileTap={{ scale: 1.4,y:-20 }}
                    cursor={"pointer"}
                    onClick={UpVote}
                    fontSize={["2.5rem", "3rem"]}
                  >
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
                {isEditable ? (
                  <AnimatePresence>
                    <Input
                    key={takeId}
                    as={motion.input}{... isEditableVariant}
                      onChange={(e) => setformValue(e.target.value)}
                      isInvalid={formValue.length == 0}
                      value={formValue}
                      type={"text"}
                    />
        
                  </AnimatePresence>
                ) : (
                  <Heading
                    size={["md", "lg"]}
                    w={"100%"}
                    flexWrap={"wrap"}
                    textAlign={"center"}
                  >
                    {take}
                  </Heading>
                )}
                <HStack>
                  <Text
                  as={motion.p}
                  whileTap={{ scale: 1.4,y:10 }}
                  transition={{duration:2}}
                    cursor={"pointer"}
                    onClick={DownVote}
                    fontSize={["2.5rem", "3rem"]}
                  >
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
              {isEditable ? (
                <AnimatePresence>
                  <HStack key={takeId} as={motion.div}{... isEditableVariant}>
                    <IconButton
                      onClick={editTake}
                      colorScheme={"green"}
                      icon={<CheckIcon />}
                    />
                    <IconButton
                      onClick={() => setisEditable(false)}
                      colorScheme={"red"}
                      icon={<CloseIcon />}
                    />
                  </HStack>
                </AnimatePresence>
              ) : (
                <Comments takeId={takeId} canComment={canComment} />
              )}
            </VStack>
          </HotTakeLayout>
        </VStack>
      </>
    </>
  );
};

export default HotTakes;
