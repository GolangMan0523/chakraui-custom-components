"use client";

import {
    IconButton,
    Box,
    Stack,
    Text,
    Select,
    HStack,
    Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, TriangleDownIcon } from "@chakra-ui/icons";

const TriggerSecondModal: React.FC = () => {
    const tracks = [
        { title: 1 },
        { title: 2 },
        { title: 3 },
        { title: 4 },
        { title: 5 },
    ]

    return (
        <>
            <Box mt={200} display="flex" flexDirection={'column'} alignItems={'center'} >
                <Box w={600} >
                    <HStack w={'100%'}>
                        <Stack w={'17%'} align={'center'}>
                            <Text fontSize="xl">Track</Text>
                        </Stack>
                        <Stack w={'100%'}>
                            <Select variant={'outline'} placeholder="Click" icon={<TriangleDownIcon />} borderColor={'darkgray'}>
                                {tracks.map((track, index) => (
                                    <option key={index} value={track.title}>{track.title}</option>
                                ))}
                            </Select>
                        </Stack>
                        <Stack ml={5} visibility={'hidden'}>
                            <IconButton aria-label='delete' colorScheme='red' variant='outline' icon={<DeleteIcon />} />
                        </Stack>
                    </HStack>
                    <HStack mt={10} w={'100%'}>
                        <Stack w={'15%'} align={'center'}>
                            <Text fontSize="xl">if</Text>
                        </Stack>
                        <Stack w={'90%'}>
                            <Textarea borderColor={'darkgray'} ></Textarea>
                        </Stack>
                        <Stack ml={5}>
                            <IconButton aria-label='delete' colorScheme='red' variant='outline' icon={<DeleteIcon />} />
                        </Stack>
                    </HStack>
                </Box>

            </Box>
        </>
    );
};

export default TriggerSecondModal;
