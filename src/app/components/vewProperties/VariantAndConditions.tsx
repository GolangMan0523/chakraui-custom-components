import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Select,
  Input,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { ruleProperty, ConditionalToRender } from '../../types/types';
import { useMyContext } from '../../context/context';


const userProperties: ruleProperty[] = [
  {
    name: "User Id",
    type: "TEXT",
    enumValues: [],
  },
  {
    name: "User Plan",
    type: "ENUM",
    enumValues: ["Free", "Professional", "Business Starter", "Enterprise"],
  },
  {
    name: "Timezone",
    type: "NUMBER",
    enumValues: [],
  }
]

type ConditionRowProps = {
  onAdd: (bitOperator: string, index: number) => void;
  onDelete: (index: number) => void;
  setConditionalOperator: (operator: string, index: number) => void;
  setConditionValue: (value: string, index: number) => void;
  setConditionalProperty: (property: string, index: number) => void,
  conditionalVal: ConditionalToRender;
  position: number;
};

type ConditionalAndProps = {
  onAddOr: () => void;
};



const ConditionRow: React.FC<ConditionRowProps> = ({ onAdd, onDelete, setConditionalOperator, setConditionValue, setConditionalProperty, conditionalVal, position }) => {

  const [currentRule, setCurrentRule] = useState<ruleProperty | null>(userProperties[0]);

  const setConditionalRuleProperty = (index: number) => {
    setCurrentRule(userProperties[index])
  }

  return (
    <>
      {
        conditionalVal.bitOperator === "OR" &&
        <Button colorScheme="red" onClick={() => onAdd("OR", position)} >
          OR
        </Button>
      }
      <Box p={5} shadow="md" borderRadius="md" bg="gray.700" color="white" border="dashed">
        <Grid templateColumns="repeat(5, 1fr)" gap={2} alignItems="center" marginTop="10px" >
          <GridItem colSpan={1} >
            <Select border="1px" borderColor={"gray"} onChange={(e) => {
              setConditionalProperty(e.target.value, position)
              setConditionalRuleProperty(e.target.selectedIndex)
            }} value={conditionalVal.property ?? ""}>
              {
                userProperties.map((rule, index) =>
                  <option key={index} value={rule.name} itemID={index.toString()}>{rule.name}</option>
                )
              }
              {/* ... other options ... */}
            </Select>
          </GridItem>
          <GridItem colSpan={1}>

            <Select borderColor={"gray"} onChange={(e) => setConditionalOperator(e.target.value, position)
            } value={conditionalVal.operator ?? ""}>
              <option value="equals">=</option>
              <option value="greater_than" hidden={currentRule?.type !== "NUMBER"}> {">"}</option>
              <option value="greater_than_equal" hidden={currentRule?.type !== "NUMBER"} > {">="}</option>
              <option value="lesser_than" hidden={currentRule?.type !== "NUMBER"}> {"<"}</option>
              <option value="lesser_than_equal" hidden={currentRule?.type !== "NUMBER"}> {"<="}</option>
              <option value="not_equal" > {"!="}</option>
            </Select>
          </GridItem>
          <GridItem colSpan={2} borderColor={"gray"}>
            {currentRule?.type === "ENUM" ?

              (
                <Select border="1px" borderColor={"gray"} onChange={(e) => {
                  setConditionValue(e.target.value, position)
                }} value={conditionalVal.value ?? ""}>
                  {
                    currentRule.enumValues.map((enumValue, index) => {
                      return (<option key={index} value={enumValue} itemID={index.toString()}>{enumValue}</option>)
                    })
                  }
                </Select>
              )
              : (<Input type={currentRule?.type === "NUMBER" ? "number" : "text"} onChange={(e) => setConditionValue(e.target.value, position)} value={conditionalVal.value ?? ""} />)
            }
          </GridItem>
          <GridItem colSpan={1}>
            <HStack spacing={4}>
              <Button colorScheme="green" onClick={() => onAdd("AND", position)}>
                AND
              </Button>
              <IconButton
                background={"transparent"}
                aria-label='Delete'
                color="white"
                icon={<DeleteIcon />}
                onClick={() => onDelete(position)}
                size="md" // adjust the size as needed
              />
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

const VariantAndConditions: React.FC<ConditionalAndProps> = ({ onAddOr }) => {
  const { variants, setVariants, currentVariant } = useMyContext();
  const [conditions, setConditions] = useState<ConditionalToRender[]>([{ property: "", bitOperator: "AND", operator: "", value: "" }]);

  useEffect(() => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      setConditions(variant?.rules)
    }
  }, [variants, currentVariant])

  const addCondition = (bitOperator: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      variant.rules.splice(index+1, 0, { property: "", bitOperator: bitOperator, operator: "", value: "" })
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(variant.rules)
    }
  };

  const deleteCondition = (index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newRules = variant.rules.filter((_, i) => i !== index);
      variant.rules = newRules
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newRules);
    }
    // const newConditions = conditions.filter((_, i) => i !== index);
    // setConditions(newConditions);
  }

  const setConditionalOperator = (operator: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newConditions = variant.rules.map((condition, i) => {
        if (i === index) {
          return {
            ...condition,
            operator
          }
        }
        return condition;
      });
      variant.rules = newConditions
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newConditions);
    }
  }

  const setConditionValue = (value: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newConditions = variant.rules.map((condition, i) => {
        if (i === index) {
          return {
            ...condition,
            value
          }
        }
        return condition;
      });
      variant.rules = newConditions
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newConditions);
    }
  }

  const setConditionalProperty = (property: string, index: number) => {
    const variant = variants.find(v => v.variantName === currentVariant?.variantName)
    if (variant?.rules) {
      const newConditions = variant.rules.map((condition, i) => {
        if (i === index) {
          return {
            ...condition,
            property
          }
        }
        return condition;
      });
      variant.rules = newConditions
      setVariants(variants.filter(variant => variant.variantName !== ""))
      setConditions(newConditions);
    }
  }

  if (conditions.length === 0) {
    return null;
  }

  return (
    //render this only if conditions.length > 0

    <VStack>
      {conditions.map((condition, index) => (
        <ConditionRow key={index} onAdd={addCondition} onDelete={deleteCondition} position={index}
          setConditionValue={setConditionValue} setConditionalOperator={setConditionalOperator} setConditionalProperty={setConditionalProperty} conditionalVal={condition} />
      ))}
      <Button colorScheme="red" onClick={() => addCondition("OR", conditions.length - 1)} >
        OR
      </Button>
    </VStack>
  )
};

export default VariantAndConditions;