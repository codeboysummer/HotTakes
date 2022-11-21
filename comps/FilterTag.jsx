import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";

const FilterTag = ({ color, title }) => {
  return (
    <Tag size={"lg"} variant={"solid"} colorScheme={color}>
      <TagLabel>{title}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};

export default FilterTag;
