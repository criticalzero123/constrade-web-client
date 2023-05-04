import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase-config";

const auth = getAuth();

export const createWithEmailAndPassword = (userInfo, person) => {
  return createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then((userCredentials) => {
      const user = {
        ...userInfo,
        firebaseId: userCredentials.user.uid,
      };
      return Promise.resolve({ user, person });
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;

      return Promise.reject({ code: errorCode, message: errorMessage });
    });
};
