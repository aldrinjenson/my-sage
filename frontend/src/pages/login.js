import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import firebase from "../services/firebase";

const LoginPage = () => {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);

      const currentUser = firebase.auth().currentUser;
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      const snapshot = await userRef.get();

      if (!snapshot.exists) {
        const userData = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          // Add other fields as needed
        };

        await userRef.set(userData);
      }

      router.push("/dashboard");
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-6'>Login</h1>
      <button
        onClick={handleGoogleSignIn}
        className='bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600'
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
