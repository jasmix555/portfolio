import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Stoker from "../components/Stoker";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Stoker />
    </>
  );
}
