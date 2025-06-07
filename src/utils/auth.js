export function getToken() {
    const token = sessionStorage.getItem('accessToken');
  
    return token;
}

export function setToken(accessToken) {
    sessionStorage.setItem('accessToken', `${accessToken}`);
}