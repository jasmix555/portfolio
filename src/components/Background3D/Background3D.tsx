import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 14;

    // Drifting particle field in the accent colours
    const N = 1900;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const cA = new THREE.Color("#8b7bff");
    const cB = new THREE.Color("#34e0d0");
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 46;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 46;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 34;
      const c = Math.random() > 0.5 ? cA : cB;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Wireframe form that reacts to scroll
    const icoGeo = new THREE.IcosahedronGeometry(4.4, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: "#8b7bff",
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    let mx = 0;
    let my = 0;
    let scrollP = 0;
    let raf = 0;

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight || 1;
      scrollP = window.scrollY / max;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const introStart = performance.now();
    const INTRO_MS = 2400;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.0002;

      // intro: ease 0 → 1 over the first ~1.7s
      const p = Math.min((performance.now() - introStart) / INTRO_MS, 1);
      const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic

      points.rotation.y = t + scrollP * 1.4;
      points.rotation.x = scrollP * 0.7;
      ico.rotation.x += 0.0016;
      ico.rotation.y += 0.0022;
      ico.position.y = -scrollP * 9;
      ico.scale.setScalar((1 + scrollP * 0.7) * (0.55 + 0.45 * ease));

      // fade the field in, dolly the camera back so it "settles" into the bg
      pMat.opacity = 0.85 * ease;
      icoMat.opacity = 0.22 * ease;
      camera.position.x += (mx * 2.4 - camera.position.x) * 0.05;
      camera.position.y += (-my * 2.4 - camera.position.y) * 0.05;
      camera.position.z = 7 + 7 * ease;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      pGeo.dispose();
      pMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen w-screen"
      style={{ pointerEvents: "none" }}
    />
  );
}
