import { SettingsIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import FilterTag from "./FilterTag";

const FilterTags = () => {
  return (
    <HStack>
        <Text color={'gray.400'} pr={5}><>Filter</> <SettingsIcon/></Text>
      <FilterTag color={"red"} title={"Most Hated"} />
      <FilterTag color={"green"} title={"Most Loved"} />
      <FilterTag color={"purple"} title={"Oldest"} />
      <FilterTag color={"pink"} title={"With Comments"} />
      
    </HStack>
  );
};

export default FilterTags;
