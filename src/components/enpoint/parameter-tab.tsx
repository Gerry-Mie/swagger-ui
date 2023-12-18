import {ScrollArea, Select, Table, TextInput, Tabs, Paper, Divider, Text} from "@mantine/core";
import {useStore} from "../../store.tsx";

interface Props {
    value: 'path' | 'header' | 'query'
}

const ParameterTab = ({value: value}: Props) => {

    const parameters = useStore(state => state.selected?.parameters)
    const setParameters = useStore(state => state.setSelectedParameters)

    function onParamChange(i: number, v: string) {
        setParameters(parameters?.map((val, index) => i === index ? {...val, example: v} : val) || [])
    }

    if (!parameters) return <div/>

    return (
        <Tabs.Panel value={value} pt={20} h='calc(100% - 60px)'>
            <Paper withBorder radius='md' h='100%' style={{overflow: 'hidden'}}>
                <ScrollArea h='100%'>
                    <Table withColumnBorders withRowBorders h='100%' pb={30}>
                        <Table.Tbody h={'100%'}>
                            {parameters.map((param, index) => param.in !== value ? null : (
                                <Table.Tr key={index}>
                                    <Table.Td w={180}>
                                        <Text style={{textAlign: 'center'}}>{param.name}</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        {
                                            param.schema?.enum?.length ? (
                                                <Select
                                                    value={param.example || param.schema.enum[0] || ''}
                                                    onChange={(v) => onParamChange(index, v!)}
                                                    data={param.schema.enum}
                                                />

                                            ) : (
                                                <TextInput
                                                    value={param.example || ''}
                                                    onChange={(e) => onParamChange(index, e.target.value)}
                                                />
                                            )
                                        }
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Divider style={{borderColor: 'var(--mantine-color-default-border)'}}/>
                </ScrollArea>
            </Paper>
        </Tabs.Panel>
    );
};

export default ParameterTab;
