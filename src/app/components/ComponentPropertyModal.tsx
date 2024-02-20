"use client"
import useGlobalHover from './useGlobalHover';
import {
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import AddEventModal from './AddEventModal';

const ComponentPropertyModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  useGlobalHover(onOpen, isOpen);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}  size="full" id='modal'>
        <ModalOverlay />
        <AddEventModal onClose={onClose} />
      </Modal>
    </>
  );
};

export default ComponentPropertyModal;