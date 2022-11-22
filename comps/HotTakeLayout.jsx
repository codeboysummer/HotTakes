import { Box, Container, Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

const HotTakeLayout = ({ children,likeCount,dislikeCount,total }) => {
    const likePercentage=(likeCount/total)*100
    const dislikePercentage=(dislikeCount/total)*100
  return (
    
     <VStack  border={'4px solid black'} >
       <Flex layout  w={'100%'}>
       <Box as={motion.div} layout bg={'green.400'} height={4} w={`${likePercentage}%`}></Box>
       <Box as={motion.div} layout  bg={'red.400'} height={4} w={`${dislikePercentage}%`}></Box>
       </Flex>
      < >{children}</>

      </VStack>
        
      
  );
};

export default HotTakeLayout;
