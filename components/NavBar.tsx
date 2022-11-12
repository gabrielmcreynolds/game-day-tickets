import { useUser } from "../lib/context/user.context";
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    return <></>;
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
    <nav className="h-full pt-20 fixed left-0 w-64 bg-primary ">
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
