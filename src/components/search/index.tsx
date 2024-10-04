import SearchButton from "./search-button.tsx";
import {Modal, Paper, Text, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useStore} from "../../store.tsx";
import {useSearchParams} from "react-router-dom";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {tags} = useStore()
    const [_, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState<ApiTag[]>([])

    const closeModal = ()=>setIsOpen(false)
    const updateSelected = (v: string) => () => {
        setSearchParams((p) => {
            p.set('selected', v)
            setSearchValue('')
            closeModal()
            return p
        })
    }

    useEffect(() => {
        const matches: ApiTag[] = []
        if (searchValue) {
            const search = searchValue.toLowerCase()
            Object.keys(tags).map((tagKey) => {
                tags[tagKey].map(tag=> {
                    if (tag.summary?.toLowerCase()?.includes(search)||tag.path.toLowerCase().includes(search)) {
                        matches.push(tag)
                    }
                })
            })
        }

        setSearchResults(matches)
    }, [searchValue]);

    return (
        <>
            <SearchButton onClick={()=>setIsOpen(true)}/>
            <Modal opened={isOpen} onClose={closeModal} title={'Search'}>
                <TextInput value={searchValue} onChange={(e)=>setSearchValue(e.currentTarget.value)} />
                {searchResults.map(res=> (
                    <Paper key={res.operationalId} mt={10}  radius={0} onClick={updateSelected(res.operationalId)} style={{cursor: 'pointer'}}>
                        <Text size={'lg'}>{res.summary}</Text>
                        <Text c={'dimmed'} size={'sm'}>{res.path}</Text>
                    </Paper>
                ))}
            </Modal>
        </>
    );
};

export default Search;