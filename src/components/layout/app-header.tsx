import {ActionIcon, Burger, Group} from "@mantine/core";
import {IconRefresh} from "@tabler/icons-react";
import ColorScheme from "../color-scheme.tsx";
import {useStore} from "../../store.tsx";
import AuthRoot from "../auth/auth-root.tsx";
import ServerRoot from "../server/server-root.tsx";
import ProjectRoot from "../project/project-root.tsx";
import UserRoot from "../user/user-root.tsx";
import Search from "../search";

interface Props {
    opened: boolean,
    toggle: () => void
}

const AppHeader = ({opened, toggle}: Props) => {
    const title = useStore(state => state.title)
    const loading = useStore(state => state.loading)
    const setStore = useStore(state => state.setStore)
    const user = useStore(state => state.user)

    return (
        <Group px='20' h='100%' justify={'space-between'}>
            {/* left side*/}
            <Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <div>{title}</div>
            </Group>

            <Search/>

            {/*right side*/}
            <Group>
                {!!user && (
                    <ProjectRoot/>
                )}

                <ServerRoot/>
                <AuthRoot/>
                <ActionIcon
                    className={loading ? 'spin-refresher' : ''}
                    variant='subtle' radius='xl'
                    onClick={() => setStore({key: Date.now(), loading: true})}>
                    <IconRefresh size={20}/>
                </ActionIcon>
                <ColorScheme/>
                <UserRoot/>
            </Group>
        </Group>
    );
};

export default AppHeader;