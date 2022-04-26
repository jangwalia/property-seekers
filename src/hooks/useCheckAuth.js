import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useCheckAuth = () => {
  const [checkLoggedIn, setCheckLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setCheckLoggedIn(true);
      }
      setLoading(false);
    })
  });

  return{
    checkLoggedIn, loading
  }
}

