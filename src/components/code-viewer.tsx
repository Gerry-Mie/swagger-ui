import styles from "../app.module.css";
import {CodeHighlight} from "@mantine/code-highlight";

interface Props {
    value: string
    lang?: string

}

const CodeViewer = (props: Props) => {
    return (
        <CodeHighlight className={styles.codeHighlight} h='100%' code={props.value||''} language={props.lang || 'json'}/>
    );
};

export default CodeViewer;