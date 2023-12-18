import {Group, Text} from "@mantine/core";
import {methodColors} from "../constants.ts";

const RequestLabel = (props: ApiTag) => {
    return (
        <Group gap={5}>
            <Text size='xs' c={methodColors[props.method!]}>{props.method?.toUpperCase()}</Text>
            <Text>{(props.summary || props.path?.split('/').pop())?.toLowerCase()}</Text>
        </Group>
    );
};

export default RequestLabel;