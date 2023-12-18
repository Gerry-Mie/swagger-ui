import {MantineProvider} from "@mantine/core";
import {JSX} from "react";
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import {BrowserRouter} from "react-router-dom";

interface Props {
    children: JSX.Element
}

const Provider = (props: Props) => {
    return (
        <BrowserRouter>
        <MantineProvider>{props.children}</MantineProvider>
        </BrowserRouter>
    );
};

export default Provider;