import SearchButton from "./search-button.tsx";
import {Group, Modal, Paper, Text, TextInput} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useStore} from "../../store.tsx";
import {useSearchParams} from "react-router-dom";
import {methodColors} from "../../constants.ts";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {tags} = useStore()
    const [_, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState<ApiTag[]>([])
    const searchInputRef = useRef<HTMLInputElement>(null)

    const closeModal = () => {
        setIsOpen(false)
        setSearchValue('')
    }
    const updateSelected = (v: string) => () => {
        setSearchParams((p) => {
            p.set('selected', v)
            closeModal()
            return p
        })
    }

    useEffect(() => {
        if (isOpen)
            setTimeout(()=> {
                searchInputRef.current?.focus()
            }, 300)
    }, [isOpen]);

    useEffect(() => {
        const matches: ApiTag[] = []
        if (searchValue) {
            const search = searchValue.toLowerCase()
            Object.keys(tags).map((tagKey) => {
                tags[tagKey].map(tag => {
                    if (tag.summary?.toLowerCase()?.includes(search) || tag.path.toLowerCase().includes(search)) {
                        matches.push(tag)
                    }
                })
            })
        }

        setSearchResults(matches)
    }, [searchValue]);

    return (
        <>
            <SearchButton onClick={() => setIsOpen(true)}/>
            <Modal opened={isOpen} onClose={closeModal} title={'Search'} size={'xl'}>
                <TextInput ref={searchInputRef} value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)}/>
                {searchResults.map(res => (
                    <Paper key={res.operationalId} mt={10} radius={0} onClick={updateSelected(res.operationalId)}
                           style={{cursor: 'pointer'}}>
                        <Text size={'lg'}>{res.summary}</Text>
                        <Group gap={5}>
                            <Text size={'sm'} c={methodColors[res.method]}>{res.method?.toUpperCase()}</Text>
                            <Text c={'dimmed'} size={'sm'}>{res.path}</Text>
                        </Group>
                    </Paper>
                ))}
            </Modal>
        </>
    );
};

export default Search;