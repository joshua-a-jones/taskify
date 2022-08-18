import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { getErrorMessage } from "../utils/errorHandling";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const { setUser } = useAuthContext();
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setIsCancelled(false);
    setIsPending(true);
    setError(null);

    try {
      // sign out from Firebase
      const cred = await signInWithEmailAndPassword(auth, email, password);

      //logout locally
      setUser(cred.user);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError(getErrorMessage(error));
      }
    }
  };

  // cleanup function in case component unmounts during async operation
  useEffect(() => {
    setIsCancelled(false);
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { loginUser, error, isPending };
};
