import { useRouter } from "next/router";
import { useUser } from "../context/user.context";
import { useEffect } from "react";

const useLockedRoute = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user, loading]);
};

export default useLockedRoute;
