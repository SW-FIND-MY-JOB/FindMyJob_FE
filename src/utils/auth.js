export function getToken() {
    const token = sessionStorage.getItem('accessToken');
  
    return token;
}