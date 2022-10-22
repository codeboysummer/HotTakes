// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import {useUserData} from '../lib/hooks'
import Navbar from "../comps/navbar";
import { UserContext } from "../lib/context";
import { db,auth } from "../lib/firebase";
import { useState,useEffect } from "react";
import {doc,collection, onSnapshot} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
function MyApp({ Component, pageProps }) {
  const [user] =useAuthState(auth)
  const [username, setusername] = useState(null)
 
  const userData = useUserData();
  
  return (
    <ChakraProvider>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
