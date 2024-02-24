import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    Select,
    Box,
    HStack,
    VStack,
    Tag,
    Checkbox
} from '@chakra-ui/react';
import {
    DeleteIcon, CloseIcon, AddIcon,
} from '@chakra-ui/icons';
import { ComponentProperty, PropertyTypes } from '../../types/types';
import { useMyContext } from '../../context/context';
import CustomDropDown from './CustomDropdown';

function PropertiesContent() {
    const { variants, setVariants, currentVariant, duplicatedProperties, setDuplicatedProperties } = useMyContext();

    const [propertiesToRender, setPropertiesToRender] = useState<ComponentProperty[]>([]);
    const [isAddingCustomProperty, setIsAddingCustomProperty] = useState(false);
    const [customPropertyName, setCustomPropertyName] = useState('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

    useEffect(() => {
        const variant = variants.find(v => v.variantName === currentVariant?.variantName)
        setPropertiesToRender(variant?.properties || []);
    }, [currentVariant, variants])

    const changePropertyType = (type: PropertyTypes, index: number) => {
        setPropertiesToRender((prevProperties) => {
            const newProperties = [...prevProperties];
            newProperties[index].type = type;
            return newProperties;
        });
    }

    const addCustomProperty = (name: string) => {
        if (name === '' || currentVariant?.variantName === "") return;
        setCustomPropertyName('');
        setIsAddingCustomProperty(false);
        const variant = variants.find(v => v.variantName === currentVariant?.variantName)
        if (variant?.properties && !variant.properties.find(property => property.name === name)) {
            if (isDuplicate) {
                variants.map(v => {
                    if (v.variantName !== variant.variantName && v.properties
                        && !v.properties.find(property => property.name === name)) {
                        v.properties = [...v.properties || [], { value: '', type: PropertyTypes.TEXT, name }]
                    }
                })
                setDuplicatedProperties([...duplicatedProperties || [], { value: '', type: PropertyTypes.TEXT, name }])
            }
            const properties = [...variant.properties || [], { value: '', type: PropertyTypes.TEXT, name }]
            if (variant) variant.properties = properties
            setVariants(variants.filter(variant => variant.variantName !== ""))
            setPropertiesToRender(properties);
        }
        setIsDuplicate(false)
        setDisabled(true)
    };

    const handleInputChange = (value: string, index: number) => {
        setPropertiesToRender((prevProperties) => {
            const newProperties = [...prevProperties];
            newProperties[index].value = value;
            return newProperties;
        });
    };


    const handleDeleteProperty = (index: number) => {
        const variant = variants.find(v => v.variantName === currentVariant?.variantName)
        const properties = [...variant?.properties || []]
        properties.splice(index, 1);
        if (variant) variant.properties = properties
        setPropertiesToRender(properties);
    };

    const addEnumValue = (index: number, value: string) => {
        const newProperties = [...propertiesToRender];
        if (!newProperties[index].enumValues) {
            newProperties[index].enumValues = [value];
        } else {
            newProperties[index].enumValues?.push(value);
        }
        setPropertiesToRender(newProperties);
    }

    const handleDuplicate = () => {
        setIsDuplicate(prev => !prev)
    }

    const renderFormControl = () => {
        return propertiesToRender.map((property, index) => {
            const customPropertyName = property.name;
            return (
                <VStack key={index} spacing={0} align="stretch" paddingBottom={4} bg="gray.700" marginTop="10px" padding="10px" border="1px" borderRadius={"20px"} >
                    <FormControl>
                        <FormLabel textColor={"white"}>{customPropertyName}</FormLabel>
                    </FormControl>
                    <HStack spacing={0} width="350px">
                        <Select

                            defaultValue={"TEXT"}
                            borderTop={"0px"}
                            borderRight={"0px"}
                            borderBottom={"0px"}
                            borderLeft={"0px"}
                            color="gray.500"

                            onChange={(e) => changePropertyType(e.target.value as any, index)}
                            w="full" // Set width to full to take up all available space
                        // onChange, value, etc...
                        // Add your dropdown options here
                        >
                            <option value="TEXT">Text</option>
                            <option value="COLOR">Color</option>
                            <option value="NUMBER">Number</option>
                            <option value="VISIBILITY">Visibility</option>
                            <option value="ENUM">Enum</option>
                        </Select>
                        <Input
                            type={property.type === "NUMBER" ? "number" : property.type === "COLOR" ? "color" : "text"}
                            value={property.value}

                            onChange={(e) => handleInputChange(e.target.value, index)}
                            w="full" // Set width to full to take up all available space
                            style={{
                                color: 'white',
                                borderRadius: '5px',
                                borderColor: 'rgb(255, 255, 255, 0.16)', // Adjusted for Chakra UI color scheme
                                padding: '5px',
                            }}
                            placeholder="Value"
                            _placeholder={{ color: 'gray.400' }} // Adjusted for Chakra UI color scheme        
                        />
                        {property.type === "ENUM" && (
                            <IconButton
                                aria-label="Add variant"
                                icon={<AddIcon />}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleInputChange('', index)
                                    addEnumValue(index, property.value);
                                }}
                                size="sm"
                            // add your styling here
                            />)}
                        <IconButton
                            marginLeft={"10px"}
                            aria-label='Delete'
                            color="white"
                            background={"transparent"}
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteProperty(index)}
                            size="md" // adjust the size as needed
                        />
                    </HStack>
                    {
                        property.enumValues && property.enumValues.length > 0 ? (
                            <HStack marginTop={"5%"}>
                                {property.enumValues.map((enumValue, i) => (
                                    <Tag key={i}> {enumValue}</Tag>
                                ))}
                            </HStack>
                            // The content you want to render when property.enumValues is defined and has a length greater than 0
                        ) : null
                    }

                </VStack>
            );


        });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',

            }}
        >
            {propertiesToRender.length > 0 && (
                <Box>
                    {renderFormControl()}
                </Box>
            )}

            {isAddingCustomProperty && (
                <Box
                    style={{
                        color: 'white',
                        borderRadius: '5px',
                        border: '1px solid grey',
                        padding: '5px',
                        boxShadow: '0 0 5px 0px grey',
                        background: 'gray.200'
                    }}
                    marginTop={4}>
                    <VStack spacing={0} align="stretch" paddingBottom={4} padding={"3%"}>
                        <HStack spacing={0} width="350px">

                            <CustomDropDown
                                setCustomPropertyName={setCustomPropertyName}
                                setDisabled={setDisabled} />

                            <IconButton
                                icon={<CloseIcon />}
                                aria-label='Cancel'
                                onClick={() => {
                                    setCustomPropertyName('');
                                    setIsAddingCustomProperty(false);
                                }}
                                size={"sm"}
                                colorScheme="red" // You can choose the color scheme that fits your design
                                borderRadius='md'
                                marginRight={"10px"}
                                // If you want the icons without background:
                                variant="ghost"
                            />

                            <Box>
                                <Checkbox m={4} isChecked={isDuplicate} onChange={handleDuplicate}>Duplicate</Checkbox>
                            </Box>
                        </HStack>
                    </VStack>
                </Box>
            )}
            <Button
                colorScheme="purple"
                // isDisabled={isAddingCustomProperty && disabled}
                style={{
                    marginTop: '10px',
                    border: '1px solid',
                    borderRadius: '5px'
                }}
                variant={"outline"}
                onClick={() => isAddingCustomProperty ? addCustomProperty(customPropertyName) : setIsAddingCustomProperty(true)}>{isAddingCustomProperty ? "Add Property" : "Create Property"}</Button>
        </div>
    );
}

export default PropertiesContent;




