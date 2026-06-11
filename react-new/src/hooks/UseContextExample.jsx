import React, { useContext } from "react";
import UserContext from "../context/userContext.jsx";

export default function useContextExample() {
    const { user, length } = useContext(UserContext);

    if (length === 0) return <p>Loading users...</p>;

    return (
        <>
            <h2>User Context Hook</h2>
            <ol>
                {user.map(({ firstName }, i) => (
                    <li key={i}>{firstName}</li>
                ))}
            </ol>
        </>
    );
}
