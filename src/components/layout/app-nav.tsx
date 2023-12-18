import {NavLink, ScrollArea} from "@mantine/core";
import {useStore} from "../../store.tsx";
import RequestLabel from "../request-label.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const AppNav = () => {
    const {tags, endpoints, setStore} = useStore()
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedKey = searchParams.get('selected')

    useEffect(() => {
        if (selectedKey) {
            setStore({selected: endpoints[selectedKey] || null})
        }

    }, [endpoints, selectedKey])

    const updateSelected = (v: string) => () => {
        setSearchParams((p) => {
            p.set('selected', v)
            return p
        })
    }

    return (
        <ScrollArea>
            {Object.keys(tags).map((tag, index) => (
                <NavLink key={index} label={tag}>
                    {tags[tag].map((method) => {
                        return (
                            <NavLink
                                active={method.operationalId === selectedKey}
                                key={method.operationalId}
                                onClick={updateSelected(method.operationalId)}
                                // description={method.path}
                                label={<RequestLabel {...method}/>}/>
                        )
                    })}
                </NavLink>
            ))}
        </ScrollArea>
    );
};

export default AppNav;