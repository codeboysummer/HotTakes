import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import HotTakes from "../../comps/HotTakes";
import { DragHandleIcon } from "@chakra-ui/icons";
import { orderBy } from "firebase/firestore";

import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  MenuButton,
  MenuItem,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { UserContext } from "../../lib/context";
import Loader from "../../comps/Loader";
import PostsUserLiked from "../../comps/PostsUserLiked";

export default function Welcomeuser() {
  const navigate = useRouter();
  const [AllPosts, setAllPosts] = useState([]);

  const [user, loading] = useAuthState(auth);
  const [takes, settakes] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  
       
  const getData = async () => {
    setshowLoader(true);
    if (loading) return;
    if (!user) return navigate.push("/enter");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settakes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    setTimeout(() => {
      setshowLoader(false);
    }, 1000);
    return unsubscribe;
  };

  useEffect(() => {
    if (!user) {
      navigate.push("/enter");
    }
    getData();
  }, [user]);

  return (
    <>
      <>
        {showLoader ? (
          <Loader />
        ) : (
          <VStack mb={"5%"} mt={["15%", "10%", "7%"]}>
            {takes?.length == 0
              ? "you dont have any takes"
              : takes?.map((doc) => (
                  <HotTakes
                    key={doc.id}
                    postUsername={doc.username}
                    canComment={doc.canComment}
                    take={doc.take}
                    takeId={doc.id}
                  />
                ))}
            <PostsUserLiked />
          </VStack>
        )}
      </>
    </>
  );
}
