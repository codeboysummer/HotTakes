import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Input,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import React from "react";
import { auth, db } from "../lib/firebase";
import { useState } from "react";
import Switch from "react-ios-switch";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { addDoc, serverTimestamp, doc, collection } from "firebase/firestore";
const Take = () => {
  const [take, settake] = useState({ take: "" });
  const navigate=useRouter()

  const toast = useToast();
  const [switchValue, setswitchValue] = useState(false);
  const [user] = useAuthState(auth);
  const query = collection(db, `users`);
  const [docs, loading, error] = useCollectionData(query);
  

  const toggleSwitch = () => {
    if (switchValue == true) {
      setswitchValue(false);
    } else {
      setswitchValue(true);
    }
  };

  const submitTake = async () => {
    try {
      // first we need to create a reference to the documnent

      const docRef = doc(db, "users", user.uid);
      const collectionRef = collection(docRef, "takes");
      console.log(take);
      await addDoc(collectionRef, {
      take:take,
        timestamp: serverTimestamp(),
        canComment: switchValue,
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      toast({ title: "posted", status: "success", duration: 2000 });
navigate.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack h={"50vh"} display={"grid"} placeItems={"center"}>
      <VStack>
        <Flex
          w={[200, 500, 700]}
          gap={3}
          justifyContent={"space-around"}
          alignItems={"center"}
          border={"1px solid black"}
        >
          <HStack>
            <Text fontSize={"3rem"}>&#128077;</Text>
            <Stat>
              <StatNumber>0</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                0%
              </StatHelpText>
            </Stat>
          </HStack>
          <Input
            value={take.take}
            onChange={(e) => {
              settake(e.target.value);
            }}
            w={"80%"}
          />
          <HStack>
            <Text fontSize={"3rem"}>&#128078;</Text>
            <Stat>
              <StatNumber>0</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                0%
              </StatHelpText>
            </Stat>
          </HStack>
        </Flex>
        <HStack>
          <Switch
            checked={switchValue}
            onChange={toggleSwitch}
            disabled={undefined}
            handleColor="white"
            name={undefined}
            offColor="white"
            onColor={"rgb(76, 217, 100)"}
            pendingOffColor={undefined}
            pendingOnColor={undefined}
            readOnly={undefined}
            style={undefined}
          />
          <Text>Comments</Text>
        </HStack>
        <Button onClick={submitTake} size={"lg"} colorScheme={"blue"}>
          Submit
        </Button>
      </VStack>
    </VStack>
  );
};

export default Take;
