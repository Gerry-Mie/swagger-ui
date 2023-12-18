import {useSearchParams} from "react-router-dom";

const useAppSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateParams = (k: string, v: string) => {
        setSearchParams(searchParams => {
            searchParams.set(k, v);
            return searchParams;
        });
    };
    return [Object.fromEntries(searchParams), updateParams]
};

export default useAppSearchParams;