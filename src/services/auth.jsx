export const getUserStorage = () =>{
    const user = localStorage.getItem("user");
    const headers = localStorage.getItem("headers");
    return {
        user: user ? JSON.parse(user) : null,
        headers: headers ? JSON.parse(headers) : null,
      };

}

export const setUserStorage = (user, headers) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("headers", JSON.stringify(headers));
}

export const removeUserStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("headers");
}