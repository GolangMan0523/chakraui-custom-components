"use client";
import {
    VStack,
    Box,
    Stack,
    TagLabel,
    Tag,
    Text,
    Textarea,
    UnorderedList,
    ListItem
} from "@chakra-ui/react";

import { useState } from "react";

const Ticket = () => {

    const handleChangeStatus = (index: number): void => {
        if (currentStatus === index) setCurrentStatus(4);
        else setCurrentStatus(index);
    };

    const colors = ["blue", "red", "green"];
    const [currentStatus, setCurrentStatus] = useState(4);

    return (
        <>
            <Box mt={20} display="flex" justifyContent="center">
                <VStack spacing={4} w={"80%"} align={"stretch"}>
                    <Stack
                        direction="column"
                        spacing={4}
                        align="left"
                        justify={"center"}
                    >
                        <Text fontSize="2xl"><Text as='b'>Task</Text>: Enhance <Text as='b' fontSize="xl">`setEventMetadataForPageX`</Text> for Sensor Addition Tracking</Text>
                        <Text fontSize="2xl" as='b'>Details:</Text>

                        <UnorderedList>
                            <ListItem>
                                <Text fontSize="2xl"><Text as='b'>Generate Function:</Text> Execute <Text as='b' fontSize="xl">`npm run generate:analytics --session=&ldquo;abc&rdquo;`</Text> to generate the helper function named <Text as='b' fontSize="xl">`setEventMetadataForPageX`.</Text> </Text>
                            </ListItem>
                            <ListItem>
                                <Text fontSize="2xl"><Text as='b'>Integration:</Text> Add a <Text as='b' fontSize="xl">`sensor_added`</Text> boolean parameter to the <Text as='b' fontSize="xl">`setEventMetadataForPageX`</Text> function to track sensor additions by users. Set to <Text as='b' fontSize="xl">`true`</Text> when a sensor is added, and <Text as='b' fontSize="xl">`false`</Text> otherwise. Ensure accuracy in logging this data.</Text>
                            </ListItem>
                        </UnorderedList>

                        <br />

                        <Text fontSize="2xl">Ticket Detail</Text>
                        <Textarea
                            rows={15}
                            placeholder="Name"
                            width={"100%"}
                        >
                        </Textarea>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={10}
                        mt={2}
                    >
                        <Text fontSize="2xl">Status:</Text>
                        <Stack
                            direction="row"
                            justify={"flex-start"}
                            spacing={"13"}
                        >
                            {[
                                "In production",
                                "Developing",
                                "Switched off",
                            ].map((status, index) => (
                                <Tag
                                    size={"lg"}
                                    key={status}
                                    cursor={"pointer"}
                                    variant={
                                        index === currentStatus
                                            ? "solid"
                                            : "outline"
                                    }
                                    colorScheme={colors[index]}
                                    onClick={(): void =>
                                        handleChangeStatus(index)
                                    }
                                >
                                    <TagLabel>{status}</TagLabel>
                                </Tag>
                            ))}
                        </Stack>
                    </Stack>
                </VStack>
            </Box>
        </>
    );
};

export default Ticket;
