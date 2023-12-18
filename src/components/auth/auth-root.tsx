import {IconLock} from "@tabler/icons-react";
import {ActionIcon, Modal, TextInput} from "@mantine/core";
import {useToggle} from "@mantine/hooks";
import {useStore} from "../../store.tsx";
import {ChangeEvent} from "react";

const AuthRoot = () => {
    const [modalState, toggleModal] = useToggle([false, true])
    const bearerToken = useStore(state => state.bearerToken)
    const setStore = useStore(state => state.setStore)

    const updateToken = (e: ChangeEvent<HTMLInputElement>) => setStore({bearerToken: e.target.value})

    return (
        <>
            <ActionIcon variant='subtle' radius='xl' onClick={() => toggleModal()}>
                <IconLock size={20}/>
            </ActionIcon>
            <Modal size='lg' title='Auth' opened={modalState} onClose={toggleModal}>
                <TextInput label='Bearer Token' value={bearerToken} onChange={updateToken}/>
            </Modal>
        </>
    );
};

export default AuthRoot;