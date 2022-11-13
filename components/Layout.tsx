import Head from "next/head";
import { useUser } from "../lib/context/user.context";
import { sdkProvider } from "../lib/utils/api/sdkProvider";
import { useRouter } from "next/router";
import NavBar from "./NavBar";

const Layout = ({
  children,
  title,
}: {
  children?: JSX.Element;
  title?: string;
}) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <header className="px-3 border-b bg-white border-primary shadow  h-14 sticky top-0 flex justify-end">
        {user ? (
          <button
            className="text-danger border rounded border-danger max-w-min my-2 px-3"
            onClick={() => {
              sdkProvider.provider().account.deleteSession("current");
              setUser(undefined);
              router.replace("/");
            }}
          >
            Logout
          </button>
        ) : null}
      </header>

      <div className={`${user ? "ml-64" : ""} min-h-screen`}>{children}</div>
      <footer
        data-testid="footer"
        className="text-center border-t border-primary text-primary py-4 pl-5"
      >
        © {new Date().getFullYear()} Game Day Tickets
        <br />
        Built by Gabriel McReynolds
      </footer>
    </>
  );
};

export default Layout;
