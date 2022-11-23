import { auth, db, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash/debounce";
import { Box, Button, Heading, Image, Input, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Enter() {
  const route=useRouter()
  const { user, username } = useContext(UserContext);
  useEffect(() => {
    if(username){
      route.push('/')

    }
    
  }, [username])

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <VStack mt={'20%'}>
      {user ? (
        !username ? (
          <UsernameForm  />
        ) : (
          <>hello {username}</>
        )
      ) : (
        <VStack mt={'5%'}>
          <Heading>Signin with google</Heading>
          <SignInButton  />
        </VStack>
      )}
    </VStack>
  );
}

// Sign in with Google button
function SignInButton() {
  const toast = useToast();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast({
        status: "success",
        title: "welcome to HotTakes",
        duration: 2000,
      });
     
      
    } catch (error) {}
  };

  return (
    <Button className="btn-google" onClick={signInWithGoogle}>
      <Image alt="" src={"/google.png"} width="30px" /> Sign in with Google
    </Button>
  );
}

// Sign out button


// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    try {
      const userDoc = doc(db, `users/${user.uid}`);
      const usernameDoc = doc(db, `usernames/${formValue}`);

      // Commit both docs together as a batch write.
      const batch = writeBatch(db);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();

    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, `usernames/${username}`);
        const docSnap = await getDoc(ref);
        const exists = docSnap.exists();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <Box>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <Input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </Button>

         
          <div>
            Username: {formValue}
            Username Valid: {isValid.toString()?'this username is ready to take':'this username is taken'}
          </div>
        </form>
      </Box>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
