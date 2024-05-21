import {useStore} from "../store.tsx";
import {useEffect} from "react";
import yaml from "js-yaml";
import {OpenApi} from "../lib/open-api.ts";

const useOpenApiLoader = () => {
    const storeKey = useStore(state => state.key)
    const yamlUrl = useStore(state => state.yamlUrl)
    const setStore = useStore(state => state.setStore)
    const server = useStore(state => state.server)

    useEffect(() => {
        async function loadYaml() {
            setStore({loading: true})
            try {
                const text = await fetch(yamlUrl || '').then(res => res.text())
                const obj = yaml.load(text) as OpenAPI

                // console.log(obj)
                const openApi = new OpenApi(obj)

                const parsed = openApi.parse();

                let cServer = server
                const serverObj: ServerObj = {};
                (obj.servers || []).forEach((v: Server, i: number) => {
                    const so = {...v, key: i.toString()}
                    serverObj[i] = so
                    if (server?.key === '00' && v.url === server.url) cServer = so;
                })

                setStore({
                    title: obj.info.title || 'Swagger UI',
                    servers: serverObj,
                    tags: parsed.tags,
                    endpoints: parsed.endpoints,
                    loading: false,
                    server: cServer
                })
            } catch (e) {
                setStore({loading: false})
                alert('Failed to update')
                console.log(e)
            }

        }

        if (yamlUrl) {
            loadYaml().catch(console.error)
        } else {
            setStore({loading: false})
        }

    }, [storeKey])
}
export default useOpenApiLoader