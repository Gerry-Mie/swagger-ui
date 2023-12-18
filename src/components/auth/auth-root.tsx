import {IconLock} from "@tabler/icons-react";
import {ActionIcon, Modal, Textarea} from "@mantine/core";
import {useToggle} from "@mantine/hooks";
import {useStore} from "../../store.tsx";
import {ChangeEvent, useEffect} from "react";

const AuthRoot = () => {
    const [modalState, toggleModal] = useToggle([false, true])
    const bearerToken = useStore(state => state.bearerToken)
    const setStore = useStore(state => state.setStore)

    useEffect(() => {
        setStore({bearerToken: bearerToken || localStorage.getItem('token') || ''})
    }, [])

    const updateToken = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setStore({bearerToken: e.target.value})
        localStorage.setItem('token', e.target.value)
    }

    return (
        <>
            <ActionIcon variant='subtle' radius='xl' onClick={() => toggleModal()}>
                <IconLock size={20}/>
            </ActionIcon>
            <Modal size='lg' title='Auth' opened={modalState} onClose={toggleModal}>
                <Textarea rows={4} label='Bearer Token' value={bearerToken} onChange={updateToken}/>
            </Modal>
        </>
    );
};

export default AuthRoot;