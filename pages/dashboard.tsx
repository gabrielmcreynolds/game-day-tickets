import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    router.replace("/");
  }
  return (
    <Layout>
      <>{user?.name}</>
    </Layout>
  );
};

export default Dashboard;
