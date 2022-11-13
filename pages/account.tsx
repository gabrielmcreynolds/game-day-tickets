import useLockedRoute from "../lib/hooks/useLockedRoute";
import { useUser } from "../lib/context/user.context";
import Layout from "../components/Layout";

const Account = () => {
  useLockedRoute();
  const { user } = useUser();

  return (
    <Layout title="Account">
      <main className="mt-20 max-w-2xl xl:mx-auto">
        <h1 className="text-4xl mb-12">Account</h1>
        <p className="text-xl my-2">Name: {user?.name}</p>
        <p className="text-xl my-2">Email: {user?.email}</p>
        <div className="text-xl my-2">Phone: {user?.phone}</div>
      </main>
    </Layout>
  );
};

export default Account;
