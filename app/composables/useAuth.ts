import { createAuthClient } from "better-auth/vue"


export function useAuth() {
    const authClient = createAuthClient({
        baseURL : "http://localhost:3000",
    
    })

  const logout = async () => {
  await authClient.signOut()
  // redirect after logout
  await navigateTo('/auth/login')
}

    return  {
        signIn : authClient.signIn,
        signUp : authClient.signUp,
        logout,
      
    }
}


