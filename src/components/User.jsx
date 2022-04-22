import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function User() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return user ? <h1>{user.displayName}</h1> : <h1>no user logged in</h1>;
}
