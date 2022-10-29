import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import HotTakes from "../../comps/HotTakes";

import {
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "../../lib/context";

export default function Welcomeuser() {
  const navigate = useRouter();
  const { username } = useContext(UserContext);
  const [user] = useAuthState(auth);
  const [takes, settakes] = useState([]);
  const getData = async () => {
    // if user is present run function

    if (user) {
      const docRef = doc(db, "users", user.uid);
      const collectionRef = collection(docRef, "takes");
      const querySnapshot = await getDocs(collectionRef);

      const data = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      settakes(data);

      // from firebase docs

      // querySnapshot.forEach((doc) => {
      //   console.log("getData()", doc.id, " => ", doc.data());
      // });

      // const data = querySnapshot.docs.map((d) => ({
      //   id: d.id,
      //   ...d.data(),
      // }));
    }
  };

  // use effect is because on initial page load the user may not have been loaded yet so when it changes the useeffect will re-run
  // giving fresh data

  useEffect(() => {
    getData();
    console.log("data:", takes);
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
      {takes.map((doc) => (
        <HotTakes key={doc.id} canComment={doc.canComment} take={doc.take} />
      ))}
    </>
  );
}
