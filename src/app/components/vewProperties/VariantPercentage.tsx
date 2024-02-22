import React from 'react';
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  HStack,
  Checkbox
} from '@chakra-ui/react';

function VariantPercentageInput() {
  return (
    <Box p={5} shadow="md" border="none" borderRadius="md" bg="gray.700" color="white" w={'100%'} mt={10}>
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Variant 1
        </Text>

        <InputGroup maxW="10vw">
          <NumberInput defaultValue={12} min={0} max={100} clampValueOnBlur={false} >
            <NumberInputField paddingRight="2rem" />
          </NumberInput>
          <InputRightAddon background="transparent" border="none">%</InputRightAddon>
        </InputGroup>
        <Checkbox >Default</Checkbox>
      </HStack>
    </Box>
  );
}

export default VariantPercentageInput;