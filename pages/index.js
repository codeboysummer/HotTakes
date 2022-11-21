import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Head from "next/head";
import { useEffect } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import PostFeed from "../comps/PostFeed";
import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Box, Button, Flex, Heading, HStack, Progress, SkeletonCircle, SkeletonText, Spinner, Stack, Tag, TagCloseButton, TagLabel, Text, VStack } from "@chakra-ui/react";
import Loader from "../comps/Loader";

export default function Home() {
  const [user] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);
  const [lastDoc, setlastDoc] = useState([]);
  const [loading, setloading] = useState(false);
  const [endReached, setendReached] = useState(false);
  const [showSkeleton, setshowSkeleton] = useState(true)

  const getPosts = async () => {
    
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setlastDoc(lastVisible);
      setTimeout(() => {
        setshowSkeleton(false)
      }, 1500);
      
    });

    return unsubscribe;
  };

  const getMore = async () => {
    try {
      setloading(true);
      const collectionRef = collection(db, "posts");
      const q = query(
        collectionRef,
        orderBy("timestamp", "desc"),
        limit(4),
        startAfter(lastDoc)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAllPosts([
          ...allPosts,
          ...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),

        ]

        
        
        );

        console.log(snapshot.docs.length);
        if (snapshot.docs.length==0) {
          setendReached(true)
          
        } else {
          setendReached(false)
          
        }
       

        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setlastDoc(lastVisible);
      });
      setloading(false);

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();

    // rerun when user is present
  }, [user]);

  return (
    <>
      <Head>
        <title>Hot Take</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" hrefnpm="/favicon.ico" />
      </Head>
      <main>
{ showSkeleton?<Loader/>:

<VStack mb={'5%'} mt={['15%','10%','7%']} >
  
<HStack m={5} spacing={10}>
    
  
</HStack>
 
        <PostFeed posts={allPosts} />
        
          {loading ? <Spinner /> :endReached?<Heading> no more posts</Heading>: <Button colorScheme={'blue'} onClick={getMore}>more</Button>}

        </VStack>}
      </main>
    </>
  );
}
