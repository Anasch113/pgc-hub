import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,

  
} from "firebase/auth";
import { auth, storage } from "../Firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const  userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
 

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
    
  }
function logOut(){
  return signOut(auth)
}


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //Profile Upload Storage
  const upload = async (file, user,  setLoading)=>{
   

     const fileRef = ref(storage, user.uid + '.png' )
     setLoading(true)
    
     
     const snapshot = await uploadBytes(fileRef, file)
     const photoURL = await getDownloadURL(fileRef);
     updateProfile(user, {photoURL});
     setLoading(false)
     alert("Image uploaded successfully")
   
  }
  

  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, upload, }}
      
    >
      {children}
    </userAuthContext.Provider>
  );
}

export  function useUserAuth() {
  return useContext(userAuthContext);
}
