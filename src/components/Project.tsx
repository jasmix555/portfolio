import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BoxComponent from "./Box";
import style from "@/styles/Project.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function Project() {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (inView) {
      setAutoplay(true);
    }
  }, [inView]);

  return (
    <BoxComponent
      heading="Project"
      id={"Project"}
      bgc={"#f5f5f5"}
      height={"100vh"}
    >
      <div ref={ref} className={style.wrapper}>
        <Carousel
          swipeable={true}
          infiniteLoop={true}
          emulateTouch={true}
          stopOnHover={true}
          showStatus={false}
          interval={4000}
          autoPlay={autoplay}
        >
          <Image
            alt="project-1"
            src="/projects/1.png"
            width={2000}
            height={2000}
          />
          <Image
            alt="project-2"
            src="/projects/2.png"
            width={2000}
            height={2000}
          />
          <Image
            alt="project-3"
            src="/projects/3.png"
            width={2000}
            height={2000}
          />
          <Image
            alt="project-4"
            src="/projects/4.png"
            width={2000}
            height={2000}
          />
        </Carousel>
      </div>
    </BoxComponent>
  );
}
