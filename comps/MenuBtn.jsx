import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Button,
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const MenuBtn = ({ takeId, canComment }) => {
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

  return (
    <Menu>
      <MenuButton
        alignSelf={"flex-end"}
        as={Button}
        rightIcon={<DragHandleIcon />}
      >
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Edit</MenuItem>
        {/* modal */}

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
              <Button onClick={onClose} colorScheme={"red"}>
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <MenuItem onClick={toggleComments}>{canComment?"disable":"enable"} Comments</MenuItem>
        {/* notifcation type */}
      </MenuList>
    </Menu>
  );
};
export default MenuBtn;
