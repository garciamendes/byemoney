"use client";

import { http } from "@/shared/apiHttp/http";
import { User } from "better-auth";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await http.get<{ user: User | null }>("/api/user");
        setUser(data.user);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const cleanUser = () => {
    setUser(null);
  };

  return { user, loading, cleanUser };
}
