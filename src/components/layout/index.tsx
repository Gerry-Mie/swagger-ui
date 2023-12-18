import {AppShell} from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";
import {JSX} from "react";
import AppNav from "./app-nav.tsx";
import AppHeader from "./app-header.tsx";

interface Props {
    children: JSX.Element
}

const Layout = (props: Props) => {
    const [opened, {toggle}] = useDisclosure();
    return (
        <AppShell
            header={{height: 40}}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
            }}
            padding="0"
        >
            <AppShell.Header>
               <AppHeader opened={opened} toggle={toggle}/>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <AppNav/>
            </AppShell.Navbar>

            <AppShell.Main>
                <div
                    style={{height: 'calc(100vh - (var(--app-shell-header-offset, 0px) + (var(--app-shell-padding) *2)) )'}}>
                    {props.children}
                </div>

            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;