import firebase from "./firebase-config";
import { GoogleAuthProvider } from "firebase/auth";

const socialMediaAuth = () => {
  return firebase
    .auth()
    .signInWithPopup(new GoogleAuthProvider())
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;
