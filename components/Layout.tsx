import Link from "next/link";
import Image from "next/image";
import Logo from "../public/alt_icon.png";

const Layout = ({ children }: { children?: JSX.Element }) => {
  return (
    <>
      <header className="px-3 bg-primary h-14 sticky top-0 flex flex-row">
        <Link className="my-auto" href="/dashboard">
          <Image height={30} src={Logo} alt="Logo" />
        </Link>
        <p className="my-auto mx-4 text-white">GMT</p>
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
