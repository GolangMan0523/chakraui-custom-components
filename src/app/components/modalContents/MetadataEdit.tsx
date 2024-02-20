"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Input,
    Button,
    VStack,
    HStack,
    TagLabel,
    TagCloseButton,
    Tag,
    ChakraProvider,
    TableContainer,
    Tr,
    Th,
    Thead,
    extendTheme,
    Table,
    Tbody,
    Td,
    Select,
    Stack,
    Textarea
} from "@chakra-ui/react";
import MetadataInput from "./EventMetadataSelector";
import { useEffect, useState } from "react";

const MetadataEdit = () => {

    type Meta = {
        id: number,
        name: string;
        description: string;
        metaType: number;
        _type: string;
        example: Array<string>;
    };

    const customTheme = extendTheme({
        td: {
            borderRight: "1px",
            borderRightColor: "grey.100",
        },
        th: {
            borderRight: "1px",
            borderRightColor: "grey.100",
        },
    });

    const metadataTypes = ["Event", "User", "Super"];

    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [metadatas, setMetadatas] = useState<Meta[]>([{
        id: 1,
        name: "Sensor_added",
        description: "Lorem Ipsum",
        metaType: 2,
        _type: "Number",
        example: ["abc", "def"]
    }]);

    const onAddProperty = (): void => {
        if (isAdding) {
            setIsAdding(false);
        } else {
            setMetadatas((prev) => [
                ...prev,
                {
                    id: prev[prev.length - 1].id + 1,
                    name: "a",
                    description: "c",
                    metaType: 1,
                    _type: "",
                    example: [],
                },
            ]);
            setIsAdding(true);
            setDisable(true)
        }
    };

    const [tag, setTag] = useState<string>("")
    const handleChangeAddTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value)
    }

    const handleAddTag = (id: number) => {
        console.log(id)
        const metadata = metadatas.find(data => data.id === id) as Meta
        metadata.example.push(tag)

        setMetadatas(metadatas.filter((item: Meta) => item.id >= 0));
    }

    return (
        <>
            <Box m={[5, 2]}>
                <VStack>
                    <ChakraProvider theme={customTheme}>
                        <TableContainer marginTop={100} border="1px" borderColor="grey.100">
                            <Table size="lg" variant={"unstyled"} colorScheme="gray">
                                <Thead border="1px" borderColor="grey.100">
                                    <Tr>
                                        <Th borderRight={"1px"} borderRightColor={"grey.100"}>
                                            Medata name
                                        </Th>
                                        <Th borderRight={"1px"} borderRightColor={"grey.100"}>
                                            Metadata description
                                        </Th>
                                        <Th borderRight={"1px"}>Metadata type</Th>
                                        <Th borderRight={"1px"}>Type</Th>
                                        <Th borderRight={"1px"}>Example value</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {metadatas.map((metaRow, index) => (
                                        <Tr
                                            key={index}
                                            cursor="pointer"
                                            borderBottom="1px"
                                            borderBottomColor="grey.100"
                                        >
                                            <Td borderRight={"1px"} borderRightColor={"grey.100"} verticalAlign={'top'}>
                                                <MetadataInput setDisable={setDisable} />
                                            </Td>
                                            <Td borderRight={"1px"} borderRightColor={"grey.100"} verticalAlign={'top'}>
                                                <Textarea
                                                    value={metaRow.description}
                                                    variant={"unstyled"}
                                                    borderColor={'darkgray'}
                                                    disabled={disable || index < metadatas.length - 1}
                                                ></Textarea>
                                            </Td>
                                            <Td borderRight={"1px"} borderRightColor={"grey.100"} verticalAlign={'top'}>
                                                <Select
                                                    placeholder="unselected"
                                                    value={metadataTypes[metaRow.metaType]}
                                                    borderColor={'darkgray'}
                                                    disabled={disable || index < metadatas.length - 1}
                                                >
                                                    <option value="option1">Event</option>
                                                    <option value="option2">User</option>
                                                    <option value="option3">Super</option>
                                                </Select>
                                            </Td>
                                            <Td borderRight={"1px"} borderRightColor={"grey.100"} verticalAlign={'top'}>
                                                <Select
                                                    placeholder="unselected"
                                                    value={metadataTypes[metaRow.metaType]}
                                                    borderColor={'darkgray'}
                                                    disabled={disable || index < metadatas.length - 1}
                                                >
                                                    <option value="option1">Number</option>
                                                    <option value="option2">String</option>
                                                    <option value="option3">List</option>
                                                </Select>
                                            </Td>
                                            <Td borderRight={"1px"} borderRightColor={"grey.100"} verticalAlign={'top'}>
                                                <Stack direction="row" justify={"flex-start"} spacing={"6"}>
                                                    <Input
                                                        placeholder="Add example value"
                                                        disabled={disable || index < metadatas.length - 1}
                                                        borderColor={'darkgray'}
                                                        onChange={handleChangeAddTag}
                                                    />
                                                    <Button
                                                        size="md"
                                                        w="10%"
                                                        colorScheme="orange"
                                                        onClick={() => handleAddTag(metaRow.id)}
                                                    >
                                                        <AddIcon />
                                                    </Button>
                                                </Stack>

                                                <HStack spacing={4} mt={5}>
                                                    {metaRow.example.map((tagName, index) => (
                                                        <Tag
                                                            size={"lg"}
                                                            key={index}
                                                            borderRadius="full"
                                                            variant="solid"
                                                            colorScheme="green"
                                                        >
                                                            <TagLabel>{tagName}</TagLabel>
                                                            <TagCloseButton />
                                                        </Tag>
                                                    ))}
                                                </HStack>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ChakraProvider>

                    <Button
                        colorScheme="purple"
                        variant="outline"
                        marginTop={10}
                        rightIcon={isAdding ? <></> : <AddIcon />}
                        onClick={onAddProperty}
                    >
                        {isAdding ? "Complete" : "Add Property"}
                    </Button>
                </VStack>
            </Box>
        </>
    );
};

export default MetadataEdit;
