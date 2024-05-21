import {useEffect} from "react";
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from "../lib/firebase.ts";
import {useStore} from "../store.tsx";

const useAuth = () => {
    const setStore = useStore(state => state.setStore)
    useEffect(() => {
        return onAuthStateChanged(auth, (user)=> {
            setStore({user})
        })
    }, []);
};

export default useAuth;