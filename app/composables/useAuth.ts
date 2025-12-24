import { createAuthClient } from "better-auth/vue"
import { polarClient } from "@polar-sh/better-auth";
import type { ClientOptions, InferSessionFromClient, InferUserFromClient } from "better-auth";


export function useAuth() {
    const url = useRequestURL()
    const headers = import.meta.server ? useRequestHeaders() : undefined
    const authClient = createAuthClient({
        baseURL : url.origin,
        fetchOptions:{
            headers
        },
        plugins: [
           polarClient() 
        ]
    
    })

const session = useState<InferSessionFromClient<ClientOptions> | null>('auth:session', () => null)
const user = useState<InferUserFromClient<ClientOptions> | null>('auth:user', () => null)
const sessionFetching  = import.meta.server ? ref(false) : useState("auth:sessionFetching", () => false)


const fetchSession = async() =>{
    if(sessionFetching.value){
        return
    }
    sessionFetching.value = true;
    const  {data} = await authClient.getSession({
        fetchOptions :{
            headers
        }
    })
    session.value = data?.session || null;
    user.value = data?.user || null;
    sessionFetching.value = false;
    return data;

}

    if(import.meta.client){
        authClient.$store.listen('$sessionSignal', async (signal) => {
            if(!signal) return
            await fetchSession();
        })
    }

  const logout = async () => {
  await authClient.signOut()
  // redirect after logout
  await navigateTo('/auth/login')
}

const upgradeToPro = async() =>{
    await authClient.checkout({
        slug:'pro-monthly'
    })
}

    return  {
        signIn : authClient.signIn,
        signUp : authClient.signUp,
        logout,
        upgradeToPro,
        session,
        user,
        loggedIn : computed(() => session.value),
        fetchSession,
        
    }
}


