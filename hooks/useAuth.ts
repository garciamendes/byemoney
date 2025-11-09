import { useRouter } from "next/navigation";
import { useUser } from "./user";
import { http } from "@/shared/apiHttp/http";

export function useAuth() {
  const { cleanUser } = useUser();
  const router = useRouter();

  async function logout() {
    await http.post("/api/auth/sign-out", {});
    cleanUser();

    router.replace("/login");
  }

  return { logout };
}
