import { useEffect, useState } from "react";
import UserContext from "../context/userContext";

export default function userProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            async function fetchUser() {
                const response = await fetch("https://dummyjson.com/users");
                const data = await response.json();
                console.log(data);
                setUser(data.users)
            }
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, length: user?.length ?? 0 }}>
            {children}
        </UserContext.Provider>
    )
}