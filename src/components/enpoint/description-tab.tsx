import MarkdownPreview from '@uiw/react-markdown-preview';
import {Paper, ScrollArea, Tabs, useComputedColorScheme} from "@mantine/core";

interface Props {
    value: string
}

const DescriptionTab = (props: Props) => {
    const theme = useComputedColorScheme('light', {getInitialValueInEffect: true});
    return (
        <Tabs.Panel value="description" pt={20} h='calc(100% - 60px)'>
            <Paper withBorder radius='md' p='md' h='100%'>
                <ScrollArea h='100%'>
                    <MarkdownPreview style={{backgroundColor: 'var(--mantine-color-body)'}} source={props.value} wrapperElement={{"data-color-mode": theme}}/>
                </ScrollArea>
            </Paper>

        </Tabs.Panel>
    );
};

export default DescriptionTab;