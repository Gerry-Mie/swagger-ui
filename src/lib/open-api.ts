export class OpenApi {
    constructor(private opeApi: OpenAPI) {
    }


    parse() {
        const tags:  ApiTags = {}
        const endpoints: EndPints={}
        this.getTags().forEach((tag) => tags[tag] = [])

        const paths = this.opeApi.paths;
        Object.keys(paths).forEach((path) => {
            const pathObj = paths[path];
            Object.keys(pathObj).forEach((method) => {
                const methodObj = pathObj[method as keyof Path]!;
                methodObj.tags?.map((tag) => {
                    tags[tag].push({
                        method: method as 'get' | 'post' | 'patch',
                        operationalId: methodObj.operationId,
                        summary: methodObj.summary,
                        path
                    })
                    endpoints[methodObj.operationId] = {
                        ...methodObj,
                        path,
                        response: {
                            body: '',
                            status: ''
                        },
                        method: method as 'get' | 'post' | 'patch',
                        body: JSON.stringify(this.loadContent(methodObj.requestBody?.content) || {}, null, 2),
                        parsedResponses: !methodObj.responses ? [] : Object.keys(methodObj.responses).map((key) => {
                            const response = methodObj.responses[key as keyof Responses]!;
                            const parsedBody = this.loadContent(response.content)
                            return {
                                status: key,
                                description: response.description,
                                body: typeof parsedBody==='string'?  parsedBody:  JSON.stringify(parsedBody, null, 2),
                            }
                        }),
                    };
                });
            });
        })
        //sort tags keys a-z
        return {tags, endpoints }

    }

    loadContent(content: Content) {
        if (content?.['application/json']?.schema?.type === 'string') return 'string';
        const schemaPath = content?.['application/json']?.schema?.$ref;
        const schema = schemaPath ? this.opeApi.components.schemas[schemaPath.replace('#/components/schemas/', '')] : undefined;
        return schema ? this.schemaToExample(schema) : undefined;
    }

    typeToExample(obj: SchemaProperty): any {
        if (obj.type) {
            if (obj.example) return obj.example
            if (obj.type === 'array') return [this.typeToExample(obj.items!)];
            if (obj.type === 'number') return 0;
            if (obj.type === 'string') return '';
            if (obj.type === 'boolean') return true;
            return obj.type
        }
        if (obj.$ref) {
            const schemaPath = obj?.$ref;
            const schema = schemaPath ? this.opeApi.components.schemas[schemaPath.replace('#/components/schemas/', '')] : undefined;
            return schema ? this.schemaToExample(schema) : undefined;
        }
    }

    schemaToExample(schema: ComponentSchema) {
        if (!schema.properties) return undefined
        const obj: Record<string, any> = {}
        Object.keys(schema.properties)?.forEach((key) => {
            obj[key] = this.typeToExample(schema.properties[key])
        })
        return obj;
    }

    getTags() {
        const paths = this.opeApi.paths;
        const tags = new Set<string>();
        Object.keys(paths).forEach((path) => {
            const pathObj = paths[path];
            Object.keys(pathObj).forEach((method) => {
                const methodObj = pathObj[method as keyof Path]!;
                methodObj.tags?.map((tag) => {
                    tags.add(tag);
                });
            });
        })

        //sort tags keys a-z
        return [...tags].sort((a, b) => a.localeCompare(b));
    }
}
