interface ImportMetaEnv {
    VITE_APIKEY:string
    VITE_AUTHDOMAIN:string
    VITE_PROJECTID:string
    VITE_STORAGEBUCKET:string
    VITE_MESSAGINGSENDERID:string
    VITE_APPID:string
    VITE_MEASUREMENTID:string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}