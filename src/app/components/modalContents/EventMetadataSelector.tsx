"use client";
import React, { useEffect, useState } from "react";
import {
    Input,
    VStack,
    Popover,
    Text,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    useColorModeValue,
} from "@chakra-ui/react";

type Props ={
    setDisable: (disable: boolean) => void;
}

const MetadataInput = ({setDisable}: Props) => {
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const popoverContentBg = useColorModeValue("#1a202c", "gray.800");

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState<boolean>(false)
    const [previewList, setPreviewList] = useState<string[]>([]);

    const wordlist = ["abcd", "efgh", "hijk", "lmno"];
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const preList = wordlist.filter((word) => word.includes(event.target.value));
        if (preList.length === 0 && event.target.value.length) {
            setPreviewList([`create new "${event.target.value}" property`]);
        }
        else setPreviewList(preList);
        setInputValue(event.target.value);
        if (event.target.value.length) setDisable(false) 
        else setDisable(true)
    };

    const handleCreateClick = () => {
        // Implement the logic to handle the creation of the metadata
    };

    useEffect(() => {
        if (previewList.length && inputValue.length) setOpen(true);
        else setOpen(false)
    }, [previewList, inputValue]);

    const handleSet = (setStr: string): void => {
        setPreviewList([]);
        if (setStr.includes(`"`)) {
            setInputValue(setStr.split(`"`)[1])
        } else {
            setInputValue(setStr);
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            <Popover placement="bottom-start" isOpen={open} computePositionOnMount autoFocus>
                <PopoverTrigger>
                    <Input
                        placeholder="Type to add a new metadata"
                        value={inputValue}
                        onChange={handleInputChange}
                        borderColor={borderColor}
                    />
                </PopoverTrigger>
                <PopoverContent borderColor={borderColor} bg={popoverContentBg} zIndex={10002}>
                    <PopoverArrow />
                    <VStack p={4}>
                        {previewList &&
                            previewList.map((item, index) => (
                                <Text key={index} onClick={() => handleSet(item)} w='100%' textAlign={'center'}>
                                    {item}
                                </Text>
                            ))}
                    </VStack>
                </PopoverContent>
            </Popover>
        </VStack>
    );
};

export default MetadataInput;
