import { useCallback, useEffect, useState } from "react";

interface User {
  name: string;
  password: string;
}
export default function User() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    const response = await fetch("http://localhost:8080/user");
    const getUser = await response.json();

    setUser(getUser);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <div>{JSON.stringify(user, null, 2)}</div>;
}
