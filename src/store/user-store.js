import {userService} from '../services/user-service.js'


export const userStore = {
    state:{
        users:null,
        loggedInUser: userService.getLoggedInUser() || null,
    },
    getters:{
        loggedInUser({loggedInUser}){
            return loggedInUser
        },
        users({users}){
            return users
        }
    },
    mutations:{
        setLoggedInUser(state,{user}){
            state.loggedInUser = user
        },
        setUsers(state,{users}){
            state.users = users
        }
    },
    actions:{
        async loadUsers({commit}){
            try {
                const users = await userService.getUsers()
                commit({type:'setUsers', users})
            }catch(err){
                console.log('Failed to load users');
            }

        },
        async login({commit},{userCreds}){
            console.log('userCreds:',userCreds);
            const user = await userService.login(userCreds)
            commit({type:'setLoggedInUser' , user})
            return user
        },
        async signup({commit},{userCreds}){
            console.log('userCreds', userCreds);
            const user = await userService.signup(userCreds)
            console.log(user);
            commit({type:'setLoggedInUser' , user})
            return user
        },
        async logout({commit}){
            userService.logout()
            commit({type:'setLoggedInUser', user:null})
        }
    }
}