export const getUserStorage = () => {
    try {
        const user = localStorage.getItem("user");
        const headers = localStorage.getItem("headers");
        return {
            user: user && user !== "undefined" ? JSON.parse(user) : null,
            headers: headers && headers !== "undefined" ? JSON.parse(headers) : null,
        };
    } catch (error) {
        console.error("Error al parsear datos de localstorage", error);
        return { user: null, headers: null };
    }
}

export const setUserStorage = (user, headers) => {

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("headers", JSON.stringify(headers));
}

export const removeUserStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("headers");
}