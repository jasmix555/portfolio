import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMotionEnabled } from "../MotionToggle";

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Clear, slow, domain-warped beige "current". Procedural per-frame (no
// simulation), so the waves stay crisp. A tiny pointer term keeps it alive
// without distorting the look.
const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform float uMobile;
  uniform vec2  uRes;
  uniform vec2  uPointer;

  vec2 hash(vec2 p){
    p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash(i+vec2(0,0)), f-vec2(0,0)),
                   dot(hash(i+vec2(1,0)), f-vec2(1,0)), u.x),
               mix(dot(hash(i+vec2(0,1)), f-vec2(0,1)),
                   dot(hash(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v=0.0, a=0.5;
    int oct = uMobile > 0.5 ? 4 : 5;
    for(int i=0;i<6;i++){ if(i>=oct) break; v+=a*noise(p); p*=2.0; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * 0.03;                       // slow
    vec2 flow = p * 1.7 + vec2(0.0, uScroll * 1.1) + uPointer * 0.04;

    vec2 q = vec2(fbm(flow + vec2(0.0, t)),
                  fbm(flow + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(flow + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
                  fbm(flow + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t));
    float f = fbm(flow + 2.0 * r) * 0.5 + 0.5;

    // clear beige waves — visible contrast, no orange
    vec3 paperHi = vec3(0.945, 0.918, 0.862);
    vec3 paperLo = vec3(0.812, 0.770, 0.675);
    vec3 beigeDk = vec3(0.720, 0.660, 0.550);

    vec3 col = mix(paperLo, paperHi, smoothstep(0.20, 0.82, f));
    float vein = smoothstep(0.5, 0.64, length(r));
    col = mix(col, beigeDk, vein * 0.18);

    // slow scroll-driven focal lift (subtle, beige — not a bright orb)
    vec2 orb = vec2(0.5 + 0.16 * sin(uTime * 0.08), 0.3 + uScroll * 0.5);
    float g = smoothstep(0.55, 0.0, distance(p, vec2(orb.x * aspect, orb.y)));
    col += g * 0.025;

    float ridge = sin((r.x + r.y) * 8.0 + uTime * 0.4);
    col -= smoothstep(0.72, 1.0, abs(ridge)) * 0.02;

    float vig = smoothstep(1.3, 0.18, length(uv - 0.5));
    col *= 0.96 + 0.04 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LivingBackground() {
  const { enabled } = useMotionEnabled();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xece5d6, 1);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geo = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMobile: { value: mobile ? 1 : 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const targetPointer = new THREE.Vector2(0, 0);
    let targetScroll = 0;

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };
    const onPointer = (e: MouseEvent) => {
      targetPointer.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = max > 0 ? window.scrollY / max : 0;
      if (!enabled) {
        uniforms.uScroll.value = targetScroll;
        renderer.render(scene, camera);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fine) window.addEventListener("mousemove", onPointer, { passive: true });
    onScroll();

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      uniforms.uTime.value += clock.getDelta();
      uniforms.uPointer.value.lerp(targetPointer, 0.04);
      uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.06;
      renderer.render(scene, camera);
    };

    if (enabled) {
      loop();
    } else {
      uniforms.uScroll.value = targetScroll;
      uniforms.uPointer.value.copy(targetPointer);
      renderer.render(scene, camera);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onPointer);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [enabled]);

  return <div ref={mountRef} className="living-bg" aria-hidden="true" />;
}
