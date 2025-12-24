export default defineNuxtRouteMiddleware(async(to , from) =>{
    const {loggedIn} = useAuth();
    if(!loggedIn.value) {
        return navigateTo('/auth/login')
    }

})