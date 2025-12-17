import { createAuthClient } from "better-auth/vue"
import { polarClient } from "@polar-sh/better-auth";


export function useAuth() {
    const authClient = createAuthClient({
        baseURL : "http://localhost:3000/",
        plugins: [
           polarClient() 
        ]
    
    })

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
        upgradeToPro
    }
}


