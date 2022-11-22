import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React,{useState} from "react";
import {SmallAddIcon} from '@chakra-ui/icons'
import { motion } from "framer-motion";

const FilterTag = ({ color, title,CommentFilter  }) => {
  
  const [active, setactive] = useState(false)
 




  return (
    <Tag layout as={motion.span} cursor={'pointer'} onClick={()=>{setactive(!active),CommentFilter(active)}} size={['sm','md',"lg"]} variant={"solid"} colorScheme={active?color:'gray'}>
      <HStack >
        <TagLabel>{title}</TagLabel>
             {active && <TagCloseButton />}
            {!active&& <SmallAddIcon/>}
      </HStack>
    </Tag>
  );
};

export default FilterTag;
