import { DragHandleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const MenuBtn = ({ takeId, canComment,setisEditable }) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const toggleComments = async () => {
    try {
      const docRef = doc(db, `posts/${takeId}`);
      await updateDoc(docRef, { canComment: !canComment });

      toast({ title: "edit Completed", status: "success", duration: 2000 });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTake = async () => {
    try {
      const docRef = doc(db, `posts/${takeId}`);
      await deleteDoc(docRef);
      toast({ title: "deleted :(", status: "success", duration: 2000 });
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Menu>
      <MenuButton colorScheme={'purple'}
        alignSelf={"flex-end"}
        as={IconButton}
        icon={<DragHandleIcon />}
        
      >
        
      </MenuButton>
      <MenuList>
       
        <MenuItem onClick={()=>{setisEditable(true)}}>Edit</MenuItem>
        
        

        {/* modal */}

        {/* add editable to edit */}
        <MenuItem onClick={onOpen}>Delete</MenuItem>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Take?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Are you sure you want to Delete this Take? you wont be able to
                Recover it.
              </Text>
            </ModalBody>
            <ModalFooter gap={2}>
              <Button onClick={deleteTake} colorScheme={"red"}>
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <MenuItem onClick={toggleComments}>
          {canComment ? "Disable" : "Enable"} Comments
        </MenuItem>
        {/* notifcation type */}
      </MenuList>
    </Menu>
  );
};
export default MenuBtn;
