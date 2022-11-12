import Link from "next/link";
import Image from "next/image";
import Logo from "../public/alt_icon.png";
import Head from "next/head";
import { useUser } from "../lib/context/user.context";
import { sdkProvider } from "../lib/utils/api/sdkProvider";
import { useRouter } from "next/router";

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
      <header className="px-3 bg-primary h-14 sticky top-0 flex flex-row justify-between">
        <div className="flex flex-row">
          <Link className="my-auto" href="/dashboard">
            <Image height={30} src={Logo} alt="Logo" />
          </Link>
          <p className="my-auto mx-4 text-white">GMT</p>
        </div>
        {user ? (
          <button
            className="text-white"
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

      <div className="min-h-screen">{children}</div>
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
