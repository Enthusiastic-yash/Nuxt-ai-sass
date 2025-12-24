export default defineNuxtRouteMiddleware(async() =>{
    const {fetchSession} = useAuth();
    await fetchSession();
})