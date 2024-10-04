import {Group, Paper, Text} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";

interface Props {
    onClick?: ()=>void
}

const SearchButton = ({onClick}: Props) => {
    return (
        <Paper onClick={onClick} withBorder px={10} radius={'xl'} maw={120} w={'100%'} style={{cursor: 'pointer'}}>
            <Group gap={5}>
                <IconSearch size={14}/>
                <Text c={'dimmed'}>Search</Text>
            </Group>
        </Paper>
    );
};

export default SearchButton;