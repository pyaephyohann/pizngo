import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Backoffice = () => {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/backoffice/orders");
    }
    if (status !== "loading" && status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [router, status]);
  return null;
};

export default Backoffice;
