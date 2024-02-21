"use client"
import useGlobalHover from '../hooks/useGlobalHover';
import {
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import EventTable from './EventTable';

const ComponentPropertyModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  useGlobalHover(onOpen, isOpen);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}  size="full" id='modal'>
        <ModalOverlay />
        <EventTable onClose={onClose} />
      </Modal>
    </>
  );
};

export default ComponentPropertyModal;