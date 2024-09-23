import {Group, Text} from "@mantine/core";
import {methodColors} from "../constants.ts";

const RequestLabel = (props: ApiTag) => {
    const displayText = (props.summary || props.path?.split('/').pop())?.toLowerCase();

    return (
        <Group gap={5} wrap={"nowrap"} style={{ maxWidth: "100%" }}>
            <Text size="xs" c={methodColors[props.method!]}>{props.method?.toUpperCase()}</Text>
            <Text
                truncate={true}
                title={displayText}
                style={{maxWidth: "150px"}}
            >
                {displayText}
            </Text>
        </Group>
    );
};

export default RequestLabel;