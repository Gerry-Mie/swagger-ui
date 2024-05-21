import Layout from "./components/layout";
import EndpointRoot from "./components/enpoint/endpoint-root.tsx";
import useOpenApiLoader from "./hooks/use-open-api-loader.tsx";
import useAuth from "./hooks/use-auth.tsx";

function App() {

    useAuth()
    useOpenApiLoader()

    return (
        <Layout>
            <EndpointRoot/>
        </Layout>
    )
}

export default App
