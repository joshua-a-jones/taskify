import { FirebaseError } from "@firebase/util";

const getErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError || error instanceof Error) {
    return error.message;
  }

  return String(error);
};

export { getErrorMessage };
