import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const FilterTag = ({ color, title,alter,active,mutate }) => {


const variant={
  initial:{y:-20,opacity:0 },
  animate:{y:0,opacity:1},
  exit:{y:20,opacity:0}

}

  return (
    <Tag
      layout
      as={motion.span}
      cursor={"pointer"}
      onClick={()=>mutate()}
      size={["sm", "md", "lg"]}
      variant={"solid"}
      colorScheme={active ? color : "gray"}
    >
      <HStack {...variant} as={motion.div}>
        <TagLabel>{active?title:alter}</TagLabel>
        {active && <TagCloseButton />}
        {!active && <SmallAddIcon />}
      </HStack>
    </Tag>
  );
};

export default FilterTag;
