import Layout from "./components/layout";
import EndpointRoot from "./components/enpoint/endpoint-root.tsx";
import useOpenApiLoader from "./hooks/use-open-api-loader.tsx";

function App() {

    useOpenApiLoader()

    return (
        <Layout>
            <EndpointRoot/>
        </Layout>
    )
}

export default App
