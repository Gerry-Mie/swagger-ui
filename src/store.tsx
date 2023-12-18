import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

interface StoreValues {
    key: number,
    loading: boolean,
    title: string;
    tags: ApiTags;
    selected: HttpRequest | null,
    endpoints: EndPints
    server?: string;
    yamlUrl?: string;
    servers: Server[];
    bearerToken: string
}

interface StoreSetters {
    setStore: (v: Partial<StoreValues>) => void
    setSelectedBody: (v: string) => void
    setSelectedParameters: (v: RequestParameter[]) => void
}

type StoreInterface = StoreValues & StoreSetters

export const useStore = create<StoreInterface>()(
    devtools((set, get) => ({
        key: 0,
        loading: true,
        title: 'Swagger UI',
        tags: {},
        selected: null,
        endpoints: {},
        bearerToken: '',
        server: '',
        yamlUrl: '',
        // yamlUrl: 'https://benefeed-be.azurewebsites.net/swagger-yaml',
        servers: [],
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