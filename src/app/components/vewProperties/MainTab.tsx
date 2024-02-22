import React from 'react';
import InputComponent from './InputComponent';
import DynamicMenu from './DynamicMenu';
import TabsComponent from './TabsComponent';
import { Button, ModalHeader, ModalBody, ModalFooter, Box } from '@chakra-ui/react';
import { apiVariantData } from '../../types/types';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//call this when Save button is clicked with appropriate data  
async function callAPI(data: apiVariantData[]) {
  await sleep(3000);
  console.log(data);
}

function MainTab() {
  return (
    <>
      <ModalHeader alignSelf={"center"}>View Properties</ModalHeader>
      <ModalBody overflow={"visible"}>
        <Box display={'flex'} justifyContent={'space-between'} mt={5}>
          <InputComponent />
          <DynamicMenu />
        </Box>
        <TabsComponent />
      </ModalBody>
      <ModalFooter flexDirection="column" alignItems="center">
        <Button colorScheme="teal" variant="outline" w={'20%'}>
          Save
        </Button>
      </ModalFooter>
    </>
  );
}

export default MainTab;