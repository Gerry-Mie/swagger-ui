import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {User} from 'firebase/auth'

interface StoreValues {
    key: number,
    loading: boolean,
    title: string;
    tags: ApiTags;
    selected: HttpRequest | null,
    endpoints: EndPints
    server: Server | null;
    yamlUrl?: string;
    servers: ServerObj
    bearerToken: string,
    user: User | null,
    project: Project | null
}

interface StoreSetters {
    setStore: (v: Partial<StoreValues>) => void
    setSelectedBody: (v: string) => void
    setSelectedParameters: (v: RequestParameter[]) => void
}

type StoreInterface = StoreValues & StoreSetters

export const useStore = create<StoreInterface>()(
    devtools((set, get) => ({
        user: null,
        project: null,
        key: 0,
        loading: true,
        title: 'Swagger UI',
        tags: {},
        selected: null,
        endpoints: {},
        bearerToken: '',
        server: null,
        yamlUrl: '',
        // yamlUrl: 'https://benefeed-be.azurewebsites.net/swagger-yaml',
        servers: {},
        setStore: (v) => set(v),
        setSelectedBody: (v) => {
            const selected = get().selected!
            selected.body = v
            set({selected})
        },

        setSelectedParameters: (v) => {
            const selected = get().selected!
            selected.parameters = v
            set({selected})
        }
    }))
)