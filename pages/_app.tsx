import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../lib/context/user.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
