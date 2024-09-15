import React from "react";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logout() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully!")
          navigate("/")
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message)
        });
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-blue-400 p-3 sticky top-0 left-0 w-[100vw] flex justify-between items-center">
      <p className="font-semibold text-white text-2xl">Finance</p>
      {user && (
        <p className="cursor-pointer mr-5" onClick={logout}>
          Logout
        </p>
      )}
    </div>
  );
}

export default Header;
