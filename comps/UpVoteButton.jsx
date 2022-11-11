import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  Text,
  useToast,
} from "@chakra-ui/react";

const UpVoteButton = ({ takeId }) => {
  const [user] = useAuthState(auth);
  const [likeCount, setlikeCount] = useState(0);

  const toast = useToast();
  const getNumberOfLikes = async () => {
    const collectionRef = collection(db, `posts/${takeId}/upvote/`);
    const q = query(collectionRef);
    const collectionDoc = await getDocs(q);
    console.log(collectionDoc.size);
    return setlikeCount(collectionDoc.size);
  };
  useEffect(() => {
    getNumberOfLikes();
  }, []);
  

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
      toast({ title: "liked", status: "success", duration: 1000 });
    } catch (error) {
      console.log(error);
    }
    getNumberOfLikes();
  };
  return (
    <>
      <Text cursor={"pointer"} onClick={UpVote} fontSize={"3rem"}>
        👍
      </Text>
      <Stat>
        <StatNumber>{likeCount}</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          0%
        </StatHelpText>
      </Stat>
    </>
  );
};

export default UpVoteButton;
