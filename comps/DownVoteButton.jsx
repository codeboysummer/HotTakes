import React from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { Button, Text, useToast } from "@chakra-ui/react";

const DownVoteButton = ({ takeId }) => {
  const [user] = useAuthState(auth);
  const toast = useToast();

  const DownVote = async () => {
    if(!user){
      toast({title:'please create an account to comment ',} )
      return ;
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
      toast({ title: "disliked", status: "success", duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Text  cursor={"pointer"} onClick={DownVote} fontSize={"3rem"}>
        👎
      </Text>
    </>
  );
};

export default DownVoteButton;
