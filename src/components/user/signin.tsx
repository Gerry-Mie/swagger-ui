import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import {auth} from "../../lib/firebase.ts";
import {ActionIcon} from "@mantine/core";
import {IconUser} from "@tabler/icons-react";

const provider = new GithubAuthProvider();

const SignIn = () => {
    const signin = ()=> signInWithPopup(auth, provider).catch(console.log);

    return (
       <ActionIcon onClick={signin} variant='subtle' radius='xl'>
           <IconUser size={20}/>
       </ActionIcon>
    );
};

export default SignIn;