import { useUser } from "../lib/context/user.context";
import { useRouter } from "next/router";

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
    <nav className="h-full pt-20 -z-20 fixed left-0 w-64 bg-primary ">
      <ul>
        {keys.map((page) => (
          <ul
            className={`text-white text-2xl ml-4 my-7 ${
              router.pathname.includes(page.route) ? "underline" : ""
            }`}
            key={page.route}
          >
            {page.name}
          </ul>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
