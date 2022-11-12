import { useRouter } from "next/router";
import { useUser } from "../context/user.context";
import { useEffect } from "react";

const useLockedRoute = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);
};

export default useLockedRoute;
