import { auth,db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { collection, doc,onSnapshot } from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
       try {
        const collectionref = doc(db,`users/${user.uid}`)
        unsubscribe = onSnapshot(collectionref,(doc) => {
            setUsername(doc.data()?.username);
      });
       } catch (error) {
        console.log(error);
        
       }

   

    



    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}