import {
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import CreateTake from "../../comps/CreateTake";
import React from "react";

const takes = () => {
  return (
 <VStack>
 <CreateTake/>
 </VStack>
  );
};

export default takes;
