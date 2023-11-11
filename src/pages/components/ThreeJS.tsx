import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min.js"; // Corrected the import path
import * as THREE from "three";
import style from "@/styles/portfolio.module.scss";

export default function ThreeJS() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE, // Pass THREE as an object
          color: 0xf7f7f7,
          backgroundColor: 0x1e181e,
          spacing: 12.0,
        })
      );
    }

    return () => {};
  }, [vantaEffect]);

  return (
    <div className={style.wrapper}>
      <main className={style.content} ref={vantaRef}></main>
    </div>
  );
}
