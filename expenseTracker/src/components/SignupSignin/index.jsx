import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignupSignin() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  function SignUpfunc() {
    setLoading(true);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    //Create the user or Authenticate the user
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created");
            setLoading(false);
            setname("");
            setConfirmPassword("");
            setEmail("");
            setPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password Don't Match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are Mandatory!");
      setLoading(false);
    }
  }

  function LoginUsingEmail() {
    console.log(email);
    console.log(password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are Mandatory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    //create a doc.
    //uid should not match
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Doc Already exist");
      setLoading(false);
    }
  }

  function SignupUsingGoogle() {
    setLoading(true)
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        toast.success("User Authenticated!")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        createDoc(user)
        navigate("/dashboard")
        toast.error(errorMessage)
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message)
      setLoading(false);
    }
    
  }

  return (
    <>
      {login ? (
        <div className="w-[70%] max-w-[600px] h-auto shadow-teal-300 shadow-lg p-4">
          <h2 className="font-bold text-lg text-center m-0 mb-3">
            Login on
            <span className="text-blue-600 font-semibold">Financely</span>
          </h2>
          <form action="">
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"xyz@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email"}
              onClick={LoginUsingEmail}
            />
            <p className="text-center">Or</p>
            <Button
              onClick={SignupUsingGoogle}
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
              className="cursor-pointer"
            />
            <p
              className="text-center cursor-pointer"
              onClick={() => setLogin(!login)}
            >
              Or Don't have an Account? Click here
            </p>
          </form>
        </div>
      ) : (
        <div className="w-[70%] max-w-[600px] h-auto shadow-teal-300 shadow-lg p-4">
          <h2 className="font-bold text-lg text-center m-0 mb-3">
            SignUp on{" "}
            <span className="text-blue-600 font-semibold">Financely</span>
          </h2>
          <form action="">
            <Input
              label={"Full Name"}
              state={name}
              setState={setname}
              placeholder={"John doe"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"xyz@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />

            <Button
              className="cursor-pointer"
              disabled={loading}
              text={loading ? "Loading..." : "SignUp Using Email"}
              onClick={SignUpfunc}
            />
            <p className="text-center">Or</p>
            <Button
              onClick={SignupUsingGoogle}
              className="cursor-pointer"
              text={loading ? "Loading..." : "SignUp Using Google"}
              blue={true}
            />
            <p
              className="text-center cursor-pointer"
              onClick={() => setLogin(!login)}
            >
              Or Have an Account? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
