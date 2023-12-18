import {useToggle} from "@mantine/hooks";
import {useStore} from "../../store.tsx";
import {ActionIcon, Button, Flex, Modal, Select, Stack, TextInput} from "@mantine/core";
import {IconSend, IconServer} from "@tabler/icons-react";
import {ChangeEvent, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

const ServerRoot = () => {
    const [modalState, toggleModal] = useToggle([false, true])
    const setStore = useStore(state => state.setStore)
    const servers = useStore(state => state.servers)
    const server = useStore(state => state.server)
    const yamlUrl = useStore(state => state.yamlUrl)
    const loading = useStore(state => state.loading)
    const [searchParams, setSearchParams] = useSearchParams();

    const updateYaml = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setStore({yamlUrl: val})
        setSearchParams(pre => {
            pre.set('yaml', val || '')
            return pre
        })
    }
    const updateServer = (v: string | null) => {
        setStore({server: v || ''})

        setSearchParams(pre => {
            pre.set('server', v || '')
            return pre
        })
    }

    useEffect(() => {
        // todo
        setStore({
            yamlUrl: searchParams.get('yaml') || '',
            key: Date.now(),
            server: searchParams.get('server')|| ''
        })
    }, [])

    return (
        <>
            <ActionIcon variant='subtle' radius='xl' onClick={() => toggleModal()}>
                <IconServer size={20}/>
            </ActionIcon>
            <Modal size='lg' title='Server' opened={modalState} onClose={toggleModal}>
                <Stack>
                    <Flex gap={10} align='flex-end'>
                        <TextInput
                            w='100%'
                            label='Yaml URL'
                            value={yamlUrl}
                            onChange={updateYaml}/>

                        <Button onClick={() => setStore({key: Date.now(), loading: true})} loading={loading}>
                            <IconSend/>
                        </Button>
                    </Flex>
                    {
                        servers?.length ? (
                            <Select
                                value={server || servers[0].url || ''}
                                onChange={updateServer}
                                data={servers.map((s: Server) => ({
                                    value: s.url,
                                    label: s.url + ' - ' + s?.description
                                }))}
                                label='Server'
                                placeholder='http://localhost:8080'/>
                        ) : (
                            <TextInput
                                value={server || ''}
                                onChange={(e) => updateServer(e.target.value)}
                                label='Server URL'
                                placeholder='http://localhost:8080'/>
                        )
                    }
                </Stack>

            </Modal>
        </>
    );
};

export default ServerRoot;