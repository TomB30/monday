export const storageService = {
    saveToStorage,
    loadFromStorage,
    saveSession,
    loadSession,
    clearSession
}


function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}
function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    return JSON.parse(str)
}

function saveSession(key, value){
    sessionStorage.setItem(key , JSON.stringify(value))
 }
 
 function loadSession(key){
    return JSON.parse(sessionStorage.getItem(key))
 }
 
 function clearSession(key){
     sessionStorage.removeItem(key)
 }