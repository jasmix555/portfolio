import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MotionProvider } from "@/components/MotionToggle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionProvider>
      <Component {...pageProps} />
    </MotionProvider>
  );
}
