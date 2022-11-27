import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const FilterTag = ({ color, title,alter }) => {


const [active, setactive] = useState(false)  
  return (
    <Tag
      layout
      as={motion.span}
      cursor={"pointer"}
      onClick={() => {
        setactive(!active)
      }}
      size={["sm", "md", "lg"]}
      variant={"solid"}
      colorScheme={active ? color : "gray"}
    >
      <HStack>
        <TagLabel>{active?title:alter}</TagLabel>
        {active && <TagCloseButton />}
        {!active && <SmallAddIcon />}
      </HStack>
    </Tag>
  );
};

export default FilterTag;
