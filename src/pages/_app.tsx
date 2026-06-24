import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MotionProvider } from "@/components/MotionToggle";
import { LanguageProvider } from "@/components/editorial/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionProvider>
      <LanguageProvider>
        <SmoothScroll>
          <Component {...pageProps} />
        </SmoothScroll>
      </LanguageProvider>
    </MotionProvider>
  );
}
