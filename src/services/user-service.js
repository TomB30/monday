import {httpService} from './http-service.js'
import { storageService } from './storage-service.js';


const AUTH_URL = 'auth/'
const KEY = 'loggedUser'

export const userService = {
    login,
    signup,
    logout,
    getLoggedInUser,
    getUsers
}



function getLoggedInUser(){
    return storageService.loadSession(KEY)
}

async function getUsers(){
    try {
        return httpService.get('user/')
        
    } catch(err){
        console.log('Failed to get users',err);
    }
}

async function login(creds){
    try {
        const user = await httpService.post(AUTH_URL+'login',creds)
        storageService.saveSession(KEY,user)
        return user;
    }catch (err){
        console.log(`Email or password are invalid`,err);
    }
}

async function signup(creds){
    try {
        const user = await httpService.post(AUTH_URL+'signup',creds)
        storageService.saveSession(KEY,user)
        return user
    } catch(err){
        console.log(`couldn't signup`,err);
    }
}

async function logout(){
    try {
        await httpService.post(AUTH_URL+'logout')
        storageService.clearSession(KEY)
    } catch(err){
        console.log('Failed to logout');
    }
}