import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../lib/firebase'
import { useEffect } from 'react'

const PostsUserLiked = () => {
    const {user}=useAuthState(auth)
// function to get every post based on collection data

const getUserLikedTakes = async () => {
try {
    const userId=user?.uid
const collectionRef=collection(db,'posts')
const q=query(where('upvote','array-contains-any',`${userId}`))
const documents =getDocs(q)
console.log(documents.data());
} catch (error) {
    console.log(error);
    
}
    
}
useEffect(() => {

  getUserLikedTakes()
}, [])




  return (
    <>
    <button></button>
    </>
  )
}

export default PostsUserLiked