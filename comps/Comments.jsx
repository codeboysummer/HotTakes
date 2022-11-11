import React, { useState, useEffect, useContext } from "react";
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
  HStack,
  Image,
  Input,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

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
import { useDocument } from "react-firebase-hooks/firestore";
import { UserContext } from "../lib/context";
const Comments = ({ canComment, takeId }) => {
  const [comment, setcomment] = useState("");
  const [postComments, setpostComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [user] = useAuthState(auth);

  const { username } = useContext(UserContext);
  const handleOrderComments=()=>{}
  const getComments = async () => {
    try {
      const docRef = doc(db, "posts", takeId);
      onSnapshot(docRef, (snapshot) => {
        const postCommentsArray = snapshot?.data().postComments;
        setpostComments(postCommentsArray?.reverse());
        

        
      });
    } catch (error) {
      console.log(error);
    }
    

  };
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
          <DrawerHeader>Comments</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Input
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
            </HStack>
            <>
              {postComments?.map((comment, i) => (
                <Box mt={"1%"} bg={"blackAlpha.100"} key={i}>
                  <Flex gap={"3%"} alignItems={"center"}>
                    <Image
                      w={10}
                      h={10}
                      borderRadius={"50%"}
                      marginLeft={"right"}
                      src={comment.avatar}
                    />
                    {<Text>{comment.username}</Text>}
                    <Text>{comment.comment}</Text>
                  </Flex>
                </Box>
              ))}
            </>
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
