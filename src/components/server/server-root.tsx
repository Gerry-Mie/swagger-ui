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
    const project = useStore(state => state.project)
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
        const ns = v ? servers[v] : null
        setStore({server: ns})

        setSearchParams(pre => {
            pre.set('server', ns ? ns.url : '')
            return pre
        })
    }

    useEffect(() => {

        const urlSer = searchParams.get('server') || ''

        setStore({
            yamlUrl: searchParams.get('yaml') || '',
            key: Date.now(),
            server: {url: urlSer, key: '00'}
        })
    }, [])

    useEffect(()=>{
        if (project&&(!yamlUrl||!project.yamlUrls.includes(yamlUrl)||!server)) {
            toggleModal(true)
        }
    },[project])

    return (
        <>
            <ActionIcon variant='subtle' radius='xl' onClick={() => toggleModal()}>
                <IconServer size={20}/>
            </ActionIcon>
            <Modal size='lg' title='Server' opened={modalState} onClose={toggleModal}>


                <Stack>
                    {project
                        ? (<Select
                            label='Yaml'
                            value={yamlUrl}
                            data={project.yamlUrls}
                            onChange={(v)=> {
                                setStore({yamlUrl: v || '', key: Date.now()})
                                setSearchParams(pre => {
                                    pre.set('yaml', v || '')
                                    return pre
                                })
                            }} />)
                        : (
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
                        )
                    }

                    {
                        Object.keys(servers)?.length ? (
                            <Select
                                value={server?.key}
                                onChange={updateServer}
                                data={Object.keys(servers).map((k) => ({
                                    value: k,
                                    label: servers[k]?.description || servers[k].url
                                }))}
                                label='Server'
                                placeholder='http://localhost:8080'/>
                        ) : (
                            <TextInput
                                value={server?.url || ''}
                                onChange={(e) => setStore({server: {url: e.target.value, key: '00'}})}
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