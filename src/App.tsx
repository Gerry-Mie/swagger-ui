import Layout from "./components/layout";
import EndpointRoot from "./components/enpoint/endpoint-root.tsx";
import {useEffect} from "react";
import {useStore} from "./store.tsx";
import {OpenApi} from "./lib/open-api.ts";
import yaml from 'js-yaml'

function App() {

    const storeKey = useStore(state => state.key)
    const yamlUrl = useStore(state => state.yamlUrl)
    const setStore = useStore(state => state.setStore)

    useEffect(() => {
        async function loadYaml() {

            try {
                const text = await fetch(yamlUrl || '').then(res => res.text())
                const obj = yaml.load(text) as OpenAPI

                // console.log(obj)
                const openApi = new OpenApi(obj)

                const parsed = openApi.parse();

                setStore({
                    title: obj.info.title || 'Swagger UI',
                    servers: obj.servers || [],
                    tags: parsed.tags,
                    endpoints: parsed.endpoints,
                    loading: false
                })
            }catch (e) {
                setStore({loading: false})
                alert('Failed to update')
                console.log(e)
            }

        }

        if (yamlUrl) {
            loadYaml().catch(console.error)
        }else {
            setStore({loading: false})
        }

    }, [storeKey])

    return (
        <Layout>
            <EndpointRoot/>
        </Layout>
    )
}

export default App
