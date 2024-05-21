import {useStore} from "../../store.tsx";
import UserIcon from "./user-icon.tsx";
import SignIn from "./signin.tsx";

const UserRoot = () => {
    const user = useStore(state => state.user)
    if (user) return <UserIcon/>
    return <SignIn/>
};

export default UserRoot;