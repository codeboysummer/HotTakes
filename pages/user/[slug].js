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

import {
  Box,
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

export default function Welcomeuser() {
  const navigate = useRouter();

  const { username } = useContext(UserContext);
  const [user, loading] = useAuthState(auth);
  const [takes, settakes] = useState([]);

  const getData = async () => {
    if (loading) return;
    if (!user) return navigate.push("/enter");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settakes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  // use effect is because on initial page load the user may not have been loaded yet so when it changes the useeffect will re-run
  // giving fresh data

  useEffect(() => {
    getData();
  }, [user]);

  // useEffect(() => {
  //   console.log('didnt run');
  //   takes?.forEach((doc)=>{
  //     console.log(doc.id,'===>',doc.data());
  //   });
  //   console.log('run');
  // }, []);

  // const takesDoc=doc(db,`users/${navigate.query.slug}/takes`)
  // const [docs,loading,error]=useCollectionDataOnce(takesDoc)

  // we need username and pic and takes and maybe email

  //   querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());

  return (
    <>
      <HStack>
        <VStack w={"100%"}>
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
        </VStack>
      </HStack>
    </>
  );
}
