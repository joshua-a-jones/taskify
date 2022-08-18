import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { signOut } from "@firebase/auth";
import { getErrorMessage } from "../utils/errorHandling";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const { setUser } = useAuthContext();
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const logoutUser = async () => {
    setIsPending(true);
    setError(null);

    try {
      // sign out from Firebase
      await signOut(auth);

      //logout locally
      setUser(null);

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
    return () => setIsCancelled(true);
  }, []);

  return { logoutUser, error, isPending };
};
