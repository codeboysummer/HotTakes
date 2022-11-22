import { CloseIcon } from "@chakra-ui/icons";

import { Avatar, Box, Divider, Flex, Image, Tag, TagLabel, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

const Comment = ({ comment, postComments,deleteComment }) => {
const {user}=useContext(UserContext)


  
  return (
    <Box p={2} w={"90%"} mt={"1%"}>
      <Flex pb={"1%"} pr={"2%"} alignItems={"center"}>
        <Flex
          flexDir={["column", "row", "row"]}
          w={"100%"}
          gap={"3%"}
          alignItems={["flex-start", "center", "center"]}
        >
          <>
          <Tag cursor={'pointer'} size='lg' colorScheme='blue' borderRadius='full'>
  <Avatar
  
    src={user?.photoURL}
    size='xs'
    name={user.username}
    ml={-1}
    mr={2}
  />
  <TagLabel flexShrink={0}>@{comment.username}</TagLabel>
</Tag>
            
            <Text overflow={"hidden"} w={"80%"}>
              {comment.comment}
            </Text>
          </>
                 </Flex>
                 {user.uid == auth.currentUser.uid &&  (
          <CloseIcon cursor={'pointer'} color={'red'} onClick={() => deleteComment(comment)} />
        )} 
       
      </Flex>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default Comment;
