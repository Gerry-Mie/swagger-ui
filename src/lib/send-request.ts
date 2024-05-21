import {useStore} from "../store.tsx";

const sendRequest = async () => {
    const selected = useStore.getState().selected
    const server = useStore.getState().server
    const bearerToken = useStore.getState().bearerToken

    if (!selected) return;
    useStore.setState({selected: {...selected, fetching: true}})
    try {

        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }
        // if (authorization.type === 'jwt Bearer') {
        headers['Authorization'] = `Bearer ${bearerToken}`
        // }

        let requestPath = selected.path
        const qParam = new URLSearchParams()
        if (selected.parameters) {
            selected.parameters.forEach((param: RequestParameter) => {
                if (param.in === 'path') {
                    requestPath = requestPath?.replace(`{${param.name}}`, param.example || '')
                } else if (param.in === 'header') {
                    headers[param.name] = param.example || ''
                } else if (param.in === 'query') {
                    // return qParam[param.name] = param.example || ''
                    qParam.set(param.name, param.example || '')
                }
            })
        }

        const response: FetchResponse = selected.response!

        const res = await fetch(`${server?.url}${requestPath}?${qParam.toString()}`, {

            method: selected.method.toUpperCase(),
            headers,
            body: selected.method !== "get" ? selected.body : undefined
        })

        const contentType = res.headers.get('Content-Type');
        response.status = res.status.toString()
        if (contentType && contentType.startsWith('application/json')) {
            // parse the response as JSON
            const data = await res.json();

            response.body = JSON.stringify(data, null, 2);
        } else {
            // parse the response as text
            response.body = await res.text();
        }

        useStore.setState({selected: {...selected, response, fetching: false}})
        // setSelected((prev: any) => {
        //     return ({...prev, response: body});
        // })

    } catch (err) {
        useStore.setState({selected: {...selected, response: {body: `${err}`, status: '500'}, fetching: false}})
    }

}

export default sendRequest