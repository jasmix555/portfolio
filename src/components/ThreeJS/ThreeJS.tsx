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
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff, //
          backgroundColor: 0x000000, //
          points: 10.0,
          spacing: 20.0,
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
