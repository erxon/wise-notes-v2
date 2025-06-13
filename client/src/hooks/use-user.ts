import axios from "axios";
import { useEffect, useState } from "react";
import type User from "../lib/types/user.type";

export function useUser() {
  const [data, setData] = useState<User | null>(null);

  const url = import.meta.env.VITE_API_URL;
  const apiVersion = import.meta.env.VITE_API_VERSION;
  const rootUrl = `${url}/${apiVersion}`;

  useEffect(() => {
    axios
      .get(`${rootUrl}/users`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, apiVersion, rootUrl]);

  return data;
}
