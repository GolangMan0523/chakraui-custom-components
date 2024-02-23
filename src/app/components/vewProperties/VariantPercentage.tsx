import React, { useState, useEffect } from 'react';
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
import { useMyContext } from '../../context/context';

function VariantPercentageInput() {
  const { variants, setVariants, currentVariant } = useMyContext();
  const [percent, setPercent] = useState<string>();
  const [variantName, setVariantName] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  useEffect(() => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant) {
      setVariantName(variant.variantName)
      setPercent(String(variant.percentage))
      setIsDefault(variant.isDefaultVariant)
    }
  }, [variants, currentVariant])

  const handleSetPercent = (val: string) => {
    setPercent(val)
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant) {
      variant.percentage = Number(val)
      setVariants(variants.filter(variant => variant.variantName !== ""))
    }
  }

  const handleCheckbox = () => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant) {
      variant.isDefaultVariant = !variant.isDefaultVariant
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setIsDefault(!variant.isDefaultVariant)
    }
  }

  return (
    <Box p={5} shadow="md" border="none" borderRadius="md" bg="gray.700" color="white" w={'100%'} mt={10}>
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          {variantName}
        </Text>
        <InputGroup maxW="10vw">
          <NumberInput value={percent} min={0} max={100} clampValueOnBlur={false} >
            <NumberInputField paddingRight="2rem" onChange={(e) => handleSetPercent(e.target.value)} />
          </NumberInput>
          <InputRightAddon background="transparent" border="none">%</InputRightAddon>
        </InputGroup>
        <Checkbox isChecked={isDefault} onChange={handleCheckbox} >Default</Checkbox>
      </HStack>
    </Box>
  );
}

export default VariantPercentageInput;