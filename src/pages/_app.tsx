import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MotionProvider } from "@/components/MotionToggle";
import SmoothScroll from "@/components/SmoothScroll";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionProvider>
      <SmoothScroll>
        <Component {...pageProps} />
      </SmoothScroll>
    </MotionProvider>
  );
}
