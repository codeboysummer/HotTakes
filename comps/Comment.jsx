import { CloseIcon } from "@chakra-ui/icons";

import { Box, Divider, Flex, Image, Text, useToast } from "@chakra-ui/react";
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
            <Image
              w={[8, 10, 10]}
              h={[8, 10, 10]}
              borderRadius={"50%"}
              marginLeft={"right"}
              src={comment.avatar}
            />
            {
              <Text>
                @
                <b>
                  <i>{comment.username}</i>
                </b>
              </Text>
            }
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
