import Split from 'react-split'
import {
    Button,
    Flex,
    Group, Loader,
    Paper,
    Stack,
    Tabs,
    Text,
    Title
} from "@mantine/core";
import styles from '../../app.module.css'
import {useStore} from "../../store.tsx";
import {methodColors} from "../../constants.ts";
import ParameterTab from "./parameter-tab.tsx";

import RequestBody from "./request-body.tsx";
import DescriptionTab from "./description-tab.tsx";
import ResponsesTab from "./responses-tab.tsx";
import {CodeHighlight} from "@mantine/code-highlight";
import sendRequest from '../../lib/send-request.ts'

const EndpointRoot = () => {
    const server = useStore(state => state.server)
    const selected = useStore(state => state.selected)

    if (!selected) return <div></div>

    return (
        <Flex direction='column' h='100%'>
            <Stack>
                <Group py={5} px='lg' justify={'space-between'} bg='var(--mantine-color-gray-light-hover)'>
                    <Title order={6}>{selected.summary || selected.path?.split('/').pop()}</Title>
                    <Text c='dimmed'>{`${server?.description+' - ' || ''}${server?.url || ''}`}</Text>
                </Group>
                <Group pt={5} px='md' gap={6}>
                    <Button
                        loading={selected.fetching}
                        size='sm'
                        onClick={sendRequest}
                        color={methodColors[selected.method]}
                        w={120}>{selected.method?.toUpperCase()}</Button>
                    <Paper py={5} px={12} withBorder w='calc(100% - 130px)'>
                        <Text>{selected.path}</Text>
                    </Paper>
                </Group>
            </Stack>
            <Split
                className={styles.spitCustomStyle}
                sizes={[70, 30]}
                minSize={[0, 30]}
                expandToMin={false}
                gutterSize={4}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="vertical"
                cursor="row-resize"
            >
                <Tabs defaultValue="description" style={{overflow: 'hidden'}} px='md'>
                    <Tabs.List className={styles.tabList}>
                        <Tabs.Tab className={styles.tabTabs} value="description">Description</Tabs.Tab>
                        <Tabs.Tab className={styles.tabTabs} value="header">Header</Tabs.Tab>
                        <Tabs.Tab className={styles.tabTabs} value="path">Params</Tabs.Tab>
                        <Tabs.Tab className={styles.tabTabs} value="query">Query</Tabs.Tab>
                        <Tabs.Tab className={styles.tabTabs} value="body">Body</Tabs.Tab>
                        <Tabs.Tab className={styles.tabTabs} value="responses">Responses</Tabs.Tab>
                    </Tabs.List>

                    <DescriptionTab value={selected.description}/>
                    <ParameterTab value='header'/>
                    <ParameterTab value='path'/>
                    <ParameterTab value='query'/>
                    <RequestBody/>
                    <ResponsesTab responses={selected.parsedResponses}/>

                </Tabs>
                <Stack h='100%' gap={0}>
                    <Group justify={'space-between'} pb={10} pt={5} px='md' bg='var(--mantine-color-gray-light-hover)'>
                        <Text>Response</Text>
                        {selected.fetching ? <Loader size='sm'/> : !!selected.response.status && (
                            <Text c={selected.response.status.startsWith('2') ? 'green' : 'red'}>
                                {selected.response.status}
                            </Text>
                        )}
                    </Group>
                    {/*<Divider style={{borderColor: 'var(--mantine-color-default-border)'}}/>*/}
                    <CodeHighlight
                        className={styles.codeHighlight}
                        style={{border: 'none'}}
                        h='100%' code={selected.response.body!}
                        language={'json'}/>
                    {/*<CodeViewer value={exampleCode}/>*/}
                </Stack>
            </Split>
        </Flex>
    );
};

export default EndpointRoot;