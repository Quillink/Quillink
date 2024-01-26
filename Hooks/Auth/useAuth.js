import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

function useAuth() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        })
        return unsub;
    }, [])
    return {user}
}

export default useAuth;