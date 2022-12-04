import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { HStack, Box } from "@chakra-ui/react";
import React from "react";
import FilterTag from "./FilterTag";
export function FilterTags({
  handleSortby,
  sortby,
  active,
  handleComments,
  orderArray,
  orderFilter,
}) {
  return (
    <HStack
      alignItems={"center"}
      justifyContent={"space-around"}
      m={5}
      spacing={10}
    >
      <FilterTag
        mutate={handleSortby}
        active={sortby}
        alter={"Most Loved"}
        title={"Most Loved"}
        color={"green"}
      />

      <FilterTag
        active={active}
        alter={"with Comments"}
        mutate={handleComments}
        title={"with Comments"}
        color={"red"}
      />

      <Box>
        <FilterTag
          mutate={orderArray}
          active={orderFilter}
          alter={<ArrowUpIcon />}
          title={<ArrowDownIcon />}
          color={"purple"}
        />
      </Box>
    </HStack>
  );
}
