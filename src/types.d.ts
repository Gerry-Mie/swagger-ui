type ApiTag = { method: 'get' | 'post' | 'patch', operationalId: string, summary: string, path: string }
type ApiTags = Record<string, ApiTag[]>
type EndPints = { [key: string]: HttpRequest }
type ServerObj = {[key: string]: Server}
interface Project {
    id: string
    name: string
    yamlUrls: string[]
}


interface OpenAPI {
    openapi: string;
    info: Info;
    servers: Server[];
    paths: Paths;
    components: Components;
    // security: Security[];
    // tags: Tag[];
    // externalDocs: ExternalDocs;
}

interface Info {
    title: string;
    description: string;
    termsOfService: string;
    version: string;
}

interface Server {
    key: string;
    url: string;
    description?: string;
    variables?: Variables;
}

interface Variables {
    [key: string]: Variable;
}

interface Variable {
    default: string;
    description: string;
    enum: string[];
}

interface Paths {
    [key: string]: Path;
}

interface Path {
    get?: HttpRequest;
    post?: HttpRequest;
    patch?: HttpRequest;
}

type HttpRequest = {
    path: string,
    fetching: boolean;
    method: 'get' | 'post' | 'patch',
    description: string;
    tags: string[];
    summary: string;
    operationId: string;
    requestBody: RequestBody;
    responses: Responses;
    body?: string;
    response: FetchResponse,
    parameters?: RequestParameter[],
    parsedResponses: ParsedResponse[],
}

interface FetchResponse {
    body: string,
    status: string
}


interface ParsedResponse {
    status: string;
    description: string;
    body: string;
}

interface Responses {
    [key: string]: HttpResponse;
}

interface HttpResponse {
    description: string;
    content: Content;
}

interface RequestParameter {
    name: string;
    in: string;
    description: string;
    required: boolean;
    schema: Schema;
    example?: string;
}

interface RequestBody {
    content: Content;
    required: boolean;
}

interface Content {
    'application/json': {
        schema: Schema;
    };
}

interface Schema {
    '$ref': string;
    enum?: string[];
    type?: string;
}

interface Schemas {
    [k: string]: ComponentSchema;
}

interface ComponentSchema {
    properties: {
        [k: string]: SchemaProperty;
    },
    required?: string[];
}

interface SchemaProperty {
    type: 'string' | 'number' | 'array';
    description?: string;
    example?: string;
    $ref?: string;
    items?: SchemaProperty;
}