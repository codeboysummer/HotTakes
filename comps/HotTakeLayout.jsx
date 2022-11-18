import { Box, Container, Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import React from "react";

const HotTakeLayout = ({ children,likeCount,dislikeCount,total }) => {
    const likePercentage=(likeCount/total)*100
    const dislikePercentage=(dislikeCount/total)*100
  return (
    
     <VStack border={'4px solid black'} >
       <Flex w={'100%'}>
       <Box as="div" bg={'green.400'} height={4} w={`${likePercentage}%`}></Box>
       <Box as="div" bg={'red.400'} height={4} w={`${dislikePercentage}%`}></Box>
       </Flex>
      < >{children}</>

      </VStack>
        
      
  );
};

export default HotTakeLayout;
