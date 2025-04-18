import { useEffect, useState, useCallback} from "react";
import { anonAccount } from "../appWriteClient";
import { Models } from "appwrite";
import {generateRandomUsername} from "../utils/useAnonymouseUsername";

// Extend the Appwrite User model to include the 'username' field
interface UserWithUsername extends Models.User<Models.Preferences> {
    username: string;
  }

export const useAnonymous = () => {
  const [user, setUser] = useState<UserWithUsername | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const init = useCallback(async () => {
    try {
        const session = await anonAccount.getSession('current');
        if(!session) throw new Error("No session found");
        const userInfo = await anonAccount.get();
        // Generate username only after getting user info
    const username = generateRandomUsername();
    setUser({ ...userInfo, username });
    } catch (error) {
        // no user is logged in
        await anonAccount.createAnonymousSession();
        const userInfo = await anonAccount.get();
         // Generate username for newly created user
    const username = generateRandomUsername();
    setUser({ ...userInfo, username });

    }finally {
        setLoading(false);
    }
  }, []);


  useEffect(() => {
    init()
    }, [init])

return {user, loading}
}