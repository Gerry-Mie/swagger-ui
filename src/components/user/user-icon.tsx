import {Avatar, Menu} from "@mantine/core";
import {useStore} from "../../store.tsx";
import {IconLogout} from "@tabler/icons-react";
import {signOut} from 'firebase/auth'
import {auth, fireStore} from "../../lib/firebase.ts";
import {useEffect, useState} from "react";
import {collection, query, where, onSnapshot} from "firebase/firestore";

const UserIcon = () => {
    const user = useStore(state => state.user)!
    const project = useStore(state => state.project)
    const setStore = useStore(state => state.setStore)
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const q = query(collection(fireStore, "projects"), where("owner", "==", user.uid));
        return onSnapshot(q, (docs) => {
            const data: Project[] = []
            docs.forEach((doc) => data.push({...doc.data() as Project, id: doc.id}))
            setProjects(data)
        })
    }, [])

    const updateProject = (v: Project) =>()=> {
        setStore({project: v})
    }

    return (
        <Menu>
            <Menu.Target>
                <Avatar size={23} src={user.photoURL}/>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Projects</Menu.Label>
                {projects.map((pr, i)=> (
                    <Menu.Item color={project?.id===pr.id?'blue': ''} onClick={updateProject(pr)} key={i}>{pr.name}</Menu.Item>
                ))}
                <Menu.Divider/>
                <Menu.Item c='red' onClick={() => signOut(auth)} leftSection={<IconLogout size={16}/>}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
};

export default UserIcon;