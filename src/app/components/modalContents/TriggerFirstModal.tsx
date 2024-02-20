"use client";
import { AddIcon, TriangleDownIcon } from "@chakra-ui/icons";

import {
    Button,
    Box,
    Stack,
    Text,
    Select,
    VStack,
} from "@chakra-ui/react";

const TriggerFirstModal: React.FC = () => {
    const tracks = [
        { title: 1 },
        { title: 1 },
        { title: 1 },
        { title: 1 },
        { title: 1 },
    ]

    return (
        <>
            <Box mt={"15%"} display="flex" flexDirection={'column'} >
                <VStack spacing={4} justifyContent="center">
                    <Stack
                        direction="column"
                        spacing={4}
                        align="left"
                    >
                        <Text fontSize="xl">Track</Text>
                        <Select variant={'outline'} placeholder="Click" w={300} icon={<TriangleDownIcon />} >
                            {tracks.map((track, index) => (
                                <option key={index} value={track.title} >{track.title}</option>
                            ))}
                        </Select>
                    </Stack>
                    <Stack direction='row' spacing={4} mt={47}>
                        <Button rightIcon={<AddIcon />} w={300} colorScheme='purple' variant='outline'>
                            Add conditional
                        </Button>
                    </Stack>
                </VStack>
            </Box>
        </>
    );
};

export default TriggerFirstModal;
