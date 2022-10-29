import React from "react";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
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

const HotTakes = ({ take, canComment }) => {
  return (
    <>
      <VStack>
        <VStack m={2} border={"1px solid black"}>
          <Flex
            w={[200, 500, 700]}
            gap={3}
            justifyContent={"space-around"}
            alignItems={"center"}
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
            <Heading textAlign={'center'}>{take}</Heading>
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
            { canComment && <Text>Comments</Text>}
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default HotTakes;
