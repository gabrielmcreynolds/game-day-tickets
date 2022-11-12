"use client";

import Layout from "../components/Layout";
import { useUser } from "../lib/context/user.context";
import useLockedRoute from "../lib/hooks/useLockedRoute";

const Dashboard = () => {
  const { user } = useUser();
  useLockedRoute();
  return (
    <Layout>
      <p>{user?.name}</p>
    </Layout>
  );
};

export default Dashboard;
