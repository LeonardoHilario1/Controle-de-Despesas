import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(); 

export function UserProvider({ children }) { 
    const [usuario, setUsuario] = useState(() => {
        const saveUser = localStorage.getItem('perfilUser')
        return saveUser ? JSON.parse(saveUser) : null
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem('tokenUser') || null
    })

    useEffect(() => {
        localStorage.setItem("perfilUser", JSON.stringify(usuario))
    }, [usuario])

    useEffect(() => {
        localStorage.setItem('tokenUser', token)
    }, [token])

    return (
        <UserContext.Provider value={{ usuario, setUsuario, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}
