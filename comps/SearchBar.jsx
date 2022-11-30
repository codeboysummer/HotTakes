import { PhoneIcon, SearchIcon, UpDownIcon } from "@chakra-ui/icons";
import {
  Box,
  color,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState,useEffect } from "react";

import useComponentVisible from "../lib/useComponentVisible";
import { AnimatePresence, motion } from "framer-motion";
const SearchBar = ({ children }) => {
  const [showIcon, setshowIcon] = useState(true)
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
    useEffect(() => {
      isComponentVisible?setshowIcon(false):setshowIcon(true)
    
      
    }, [isComponentVisible])
    

  // as={motion.div} layout
  return (
    <Box
      onClick={() => setIsComponentVisible(true)}
      ref={ref}
      as={motion.div}
      layout
      w={["60%", "50%", "40%"]}
    >
      <InputGroup>
        
       
        <Input color={'white'} as={motion.input} whileFocus={{ scale: 1.2,y:-10,backgroundColor:'rgb(65,76,80)' }} />
      {showIcon&&  <InputRightElement  as={motion.div} whileFocus={{ y:-10 }}  pointerEvents="none">
          <SearchIcon mr={4} w={5} h={5} />
        </InputRightElement>}
      </InputGroup>
      <AnimatePresence key={"tagsBox"}>
        {isComponentVisible && children}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBar;
