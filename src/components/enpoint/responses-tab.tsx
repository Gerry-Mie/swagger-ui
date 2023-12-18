import {Tabs} from "@mantine/core";
import styles from '../../app.module.css'
import CodeViewer from "../code-viewer.tsx";
import {useSearchParams} from "react-router-dom";

interface Props {
    responses: ParsedResponse[]
}

const ResponsesTab = ({responses}: Props) => {
    const [searchParams] = useSearchParams();
    const selectedKey = searchParams.get('selected')
    if (!responses) return <div/>
    return (
        <Tabs.Panel value='responses' pt={20} h='calc(100% - 60px)'>

            <Tabs key={selectedKey} h='100%' defaultValue={responses[0]?.status}>
                <Tabs.List className={styles.tabList}>
                    {
                        responses.map((response, index) => (
                            <Tabs.Tab key={index} value={response.status}>
                                {response.status}
                            </Tabs.Tab>
                        ))
                    }
                </Tabs.List>
                {responses.map((response, index) => (
                    <Tabs.Panel key={index} value={response.status} h='calc(100% - 35px)' pt={20}>
                        <CodeViewer value={response.body}/>
                    </Tabs.Panel>
                ))}
            </Tabs>
        </Tabs.Panel>
    );
};

export default ResponsesTab;