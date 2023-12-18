import {Paper, ScrollArea, Tabs, useComputedColorScheme} from "@mantine/core";
import CodeMirror from '@uiw/react-codemirror';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter} from '@codemirror/lint';
import {useStore} from "../../store.tsx";
const RequestBody = () => {

    const theme = useComputedColorScheme('light', {getInitialValueInEffect: true});
    const setBody = useStore(state => state.setSelectedBody)
    const body = useStore(state => state.selected?.body)

    return (
        <Tabs.Panel value='body' pt={20} h='calc(100% - 60px)'>
            <Paper h='100%' p='md' withBorder radius='md' style={{overflow: 'hidden'}}>
                <ScrollArea h='100%'>
                    <CodeMirror
                        style={{fontSize: 13, outline: 'none'}}
                        height='100%'
                        basicSetup={{lineNumbers: false, foldGutter: false, indentOnInput: true}}
                        value={body}
                        onChange={setBody}
                        extensions={[json(), linter(jsonParseLinter())]}
                        theme={theme}/>
                </ScrollArea>
            </Paper>
        </Tabs.Panel>
    );
};

export default RequestBody;