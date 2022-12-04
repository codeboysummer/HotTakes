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
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Progress,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Loader from "../comps/Loader";

import { useRouter } from "next/router";
import FilterTag from "../comps/FilterTag";
import SearchBar from "../comps/SearchBar";
import { motion } from "framer-motion";
import useComponentVisible from "../lib/useComponentVisible";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { FilterTags } from "../comps/FilterTags";

export default function Home() {
  const route = useRouter();
  const [user] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);
  const [lastDoc, setlastDoc] = useState([]);
  const [endReached, setendReached] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [TotalLength, setTotalLength] = useState(0);
  const toast = useToast();
  const [orderFilter, setorderFilter] = useState(false);
  const [sortby, setsortby] = useState(false);
  const [KeyBoardValue, setKeyBoardValue] = useState("");
  const [active, setactive] = useState(false);
  const [order, setorder] = useState("desc");
  const [postlimit, setpostlimit] = useState(4);
  const [test, settest] = useState([]);

  // if the oldest filter is active then asc else decending
  

  

  if (typeof window !== "undefined") {
    window.onscroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("bottom");
        !endReached ? getMore() : "";
      }
    };
  }

  const getPosts = async () => {
    setendReached(false);
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      orderBy(sortby ? "like" : "timestamp", order),
      limit(postlimit)
    );
    // get four of the first from the posts collection

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // set these four to allPosts State
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      // for firebase to keep track get the index of the last doc

      setlastDoc(lastVisible);
      // save to a state variable

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });

    return unsubscribe;
  };

  const getAllPostsLength = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    // constructed query
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // take the entire array and get the length
      setTotalLength(snapshot.docs.length);
      console.log("total:", TotalLength);
      // set length
    });

    return unsubscribe;
  };

  const getMore = async () => {
    try {
      setendReached(false);

      if (!auth.currentUser) {
        return toast({
          title: "sorry to load more please signin ",
          duration: 2000,
          status: "error",
        });
      }

      const collectionRef = collection(db, "posts");
      const q = query(
        collectionRef,
        orderBy(sortby ? "like" : "timestamp", order),
        limit(4),
        startAfter(lastDoc)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAllPosts([
          ...allPosts,
          ...snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        ]);

        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setlastDoc(lastVisible);
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  // useeffect [sort] getPosts()

  const handleSortby = () => {
    sortby ? setsortby(false) : setsortby(true);
  };
  const noCommentsFilter = () => {
    if (active) {
      console.log("eh");
      console.log(allPosts.filter((item) => item.canComment));
      return allPosts.filter((item) => item.canComment);
    } else {
      return allPosts;
    }
  };
  const handleComments = () => {
    setactive(!active);
  };
  useEffect(() => {
    if (!user) {
      route.push("/enter");
    }

    getPosts();

    // rerun when user is present
  }, [user]);
  const orderArray = () => {
    if (orderFilter) {
      setorder("desc");
      setorderFilter(false);
      return;
    }
    setorder("asc");
    setorderFilter(true);

    // setorder(order == "desc" ? "asc" : "desc", setorderFilter(true));
    // order == "desc" ? setorderFilter(false) : setorderFilter(true);
  };

  useEffect(() => {
    getAllPostsLength();
    if (allPosts.length == TotalLength) {
      setendReached(true);
      console.log(allPosts.length, "==", TotalLength);
    } else {
      console.log(allPosts.length, "==", TotalLength);
      setendReached(false);
    }
    noCommentsFilter();
  }, [allPosts]);

  useEffect(() => {
    getPosts();
  }, [orderFilter]);

  // this behaves diff because it only mutates the array
  useEffect(() => {
    noCommentsFilter();

    // runs if theres a change in active
  }, [active]);
  useEffect(() => {
    getPosts();
  }, [sortby, postlimit]);

  return (
    <>
      <Head>
        <title>Hot Takes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" hrefnpm="/favicon.ico" />
      </Head>
      <main>
        {Loading ? (
          <Loader />
        ) : (
          <VStack mb={"5%"} mt={["15%", "10%", "7%"]}>
            <SearchBar setKeyBoardValue={setKeyBoardValue}>
              <>
                <FilterTags
                  handleSortby={handleSortby}
                  sortby={sortby}
                  active={active}
                  handleComments={handleComments}
                  orderArray={orderArray}
                  orderFilter={orderFilter}
                />
              </>
            </SearchBar>

            <PostFeed posts={noCommentsFilter()} filterValue={KeyBoardValue} />

            {endReached ? (
              <Heading> no more posts</Heading>
            ) : (
              <Button colorScheme={"blue"} onClick={getMore}>
                More
              </Button>
            )}
          </VStack>
        )}
      </main>
    </>
  );
}
