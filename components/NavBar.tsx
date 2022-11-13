import { useUser } from "../lib/context/user.context";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/alt_icon.png";
import PurpleLogo from "../public/short-purple-logo.png";

const NavBar = () => {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    return (
      <nav className="pt-4 z-20 fixed left-0 w-64 bg-white ">
        <div className="ml-4 flex flex-row">
          <Link className="my-auto" href="/dashboard">
            <Image height={30} src={PurpleLogo} alt="Logo" />
          </Link>
          <p className="my-auto mx-4 text-primary">GMT</p>
        </div>
      </nav>
    );
  }
  const keys: { name: string; route: string }[] = [
    {
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      name: "Sell Tickets",
      route: "/sell",
    },
    {
      name: "My Bids",
      route: "/bids",
    },
    {
      name: "Offers",
      route: "/offers",
    },
    {
      name: "Account",
      route: "/account",
    },
  ];

  return (
    <nav className="h-full pt-4 z-20 fixed left-0 w-64 bg-primary ">
      <div className="ml-4 flex flex-row">
        <Link className="my-auto" href="/dashboard">
          <Image height={30} src={Logo} alt="Logo" />
        </Link>
        <p className="my-auto mx-4 text-white">GMT</p>
      </div>

      <ul>
        {keys.map((page) => (
          <Link key={page.route} href={page.route}>
            <li
              className={`cursor-pointer text-white text-2xl ml-4 my-7 ${
                router.pathname.includes(page.route) ? "underline" : ""
              }`}
            >
              {page.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
