import {ActionIcon, Badge, Button, Divider, Flex, Modal, Stack, TextInput} from "@mantine/core";
import {IconDeviceFloppy, IconTrash} from "@tabler/icons-react";
import {useStore} from "../../store.tsx";
import {useToggle} from "@mantine/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {updateDoc, doc, addDoc, collection} from 'firebase/firestore'
import {fireStore} from "../../lib/firebase.ts";

const ProjectRoot = () => {
    const yamlUrl = useStore(state => state.yamlUrl)
    const project = useStore(state => state.project)
    const user = useStore(state => state.user)!
    const setStore = useStore(state => state.setStore)!
    const [modalState, toggleModal] = useToggle([false, true])
    const [selectedProject, setSelectedProject] = useState<Project>({
        name: '',
        yamlUrls: [yamlUrl!],
        id: ''
    })

    useEffect(() => {
        setSelectedProject(project || {
            name: '',
            yamlUrls: [yamlUrl!],
            id: ''
        })
    }, [project, modalState])

    const [loading, setLoading] = useState(false)

    const handleChangeProjectName = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedProject({...selectedProject, name: event.target.value});
    }

    const handleChangeYamlUrls = (index: number) => (event?: ChangeEvent<HTMLInputElement>) => {
        const newUrls = [...selectedProject.yamlUrls];
        newUrls[index] = event?.target.value || '';
        setSelectedProject({...selectedProject, yamlUrls: newUrls});
    };
    const handleRemoveYamlUrl = (index: number) => () => {
        const newUrls = [...selectedProject.yamlUrls];
        newUrls.splice(index, 1);
        setSelectedProject({...selectedProject, yamlUrls: newUrls});
    };

    const saveProject = async () => {
        setLoading(true)
        try {
            if (!project) {
                const projectRef = collection(fireStore, 'projects')
                const data = await addDoc(projectRef, {
                    name: selectedProject.name,
                    yamlUrls: selectedProject.yamlUrls,
                    owner: user.uid
                })
                setStore({
                    project: {...selectedProject, id: data.id},
                    key: Date.now()
                })

            } else {
                const projectRef = doc(fireStore, 'projects', project.id)
                await updateDoc(projectRef, {
                    name: selectedProject.name,
                    yamlUrls: selectedProject.yamlUrls,
                })
                setStore({
                    project: {...selectedProject},
                    key: Date.now()
                })
            }
            setLoading(false)
            alert('project saved')
            // setStore({project: selectedProject})
        } catch (e) {
            setLoading(false)
            alert('failed to save')
            console.log(e)
        }
    }

    return (
        <>
            {project
                ? <Badge onClick={() => toggleModal()} style={{cursor: 'pointer'}} variant='dot'>{project.name}</Badge>
                : (
                    <ActionIcon onClick={() => toggleModal()} variant='subtle' radius='xl'>
                        <IconDeviceFloppy size={20}/>
                    </ActionIcon>
                )
            }

            <Modal size='lg' title={project?.name || 'Create project'} opened={modalState} onClose={toggleModal}>

                <TextInput label='Project Name' value={selectedProject.name} onChange={handleChangeProjectName}/>
                <Divider label='yaml' labelPosition='left' my={20}/>
                <Stack>
                    {selectedProject?.yamlUrls.map((v, i) => (
                        <Flex key={i} gap={10} align='center'>
                            <TextInput w='100%' value={v} onChange={handleChangeYamlUrls(i)}/>
                            {selectedProject.yamlUrls.length > 1 && (
                                <ActionIcon onClick={handleRemoveYamlUrl(i)} color='red' variant='subtle' radius='xl'>
                                    <IconTrash/>
                                </ActionIcon>
                            )}

                        </Flex>
                    ))}
                    <Button variant='outline' onClick={() => handleChangeYamlUrls(selectedProject.yamlUrls.length)()}
                            color='gray' w={120}>Add yaml</Button>
                </Stack>

                <Button loading={loading} onClick={saveProject} mt={20}
                        fullWidth>{project ? 'Update' : 'Create'}</Button>
            </Modal>
        </>
    );
};

export default ProjectRoot;