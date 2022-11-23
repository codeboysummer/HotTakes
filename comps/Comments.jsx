import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  SkeletonCircle,
  SkeletonText,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { ChatIcon, CloseIcon } from "@chakra-ui/icons";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";

import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,

} from "firebase/firestore";
import { motion } from "framer-motion";
import { useDocument } from "react-firebase-hooks/firestore";
import { UserContext } from "../lib/context";
import Comment from "./Comment";
const Comments = ({ canComment, takeId }) => {
  const screenWidth = window.screen.width;
  const [comment, setcomment] = useState("");
  const [postComments, setpostComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [user] = useAuthState(auth);
  const toast = useToast();
  const [loading, setloading] = useState(false)
  const { username } = useContext(UserContext);
  const getComments = async () => {
    try {
      setloading(true)
      const docRef = doc(db, "posts", takeId);
      onSnapshot(docRef, (snapshot) => {
        const postCommentsArray = snapshot?.data()?.postComments;
        setpostComments(postCommentsArray?.reverse());
        setloading(false)
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (comment) => {
    // value passed in is the comment we wna to filter out

    const updatedArray = postComments?.filter(
      (postComment) => postComment !== comment
    );
    setpostComments(updatedArray);
    try {
      const docRef = doc(db, `posts/${takeId}`);
      await updateDoc(docRef, { postComments: updatedArray });
      toast({ title: "comment deleted", duration: 2000, status: "success" });
      getComments();
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e,) => {
    if (e.key === 'Enter') {
      HandleSubmitComment()
    }
  }
  useEffect(() => {
    getComments();
  }, [HandleSubmitComment]);

  const HandleSubmitComment = async () => {
    const docRef = doc(db, "posts", takeId);
    try {
      await updateDoc(docRef, {
        postComments: arrayUnion({
          comment: comment,
          avatar: auth.currentUser.photoURL,
          userid: user.uid,
          time: Timestamp.now(),
          username: username,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
      <HStack>
        {canComment && (
          <Button onClick={onOpen}>
            <ChatIcon
              onClick={() => {
                getComments();
              }}
              cursor={"pointer"}
              w={7}
              h={7}
            />
          </Button>
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

          <>
            <DrawerHeader>Comments</DrawerHeader>

            <>
              <Flex p={2} alignSelf={'center'}  w={['100%','70%',"50%"]}>
                <Input
                onKeyDown={(e)=>handleKeyDown(e)}
                
                  alignSelf={"center"}
                  disabled={!user}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                  placeholder="Type here..."
                />

                <Button
                  colorScheme={"purple"}
                  onClick={HandleSubmitComment}
                  disabled={!user}
                >
                  Post
                </Button>
              </Flex>
            </>
          </>
          <DrawerBody as={motion.div} layout>
            
            <VStack>
              {loading?<>
                <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
<Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
              </>:
              postComments?.map((comment, i) => (
                
                 

                  <Comment
                    key={i}
                    postComments={postComments}
                    comment={comment}
                    deleteComment={deleteComment}
                  />
                
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <></>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Comments;
