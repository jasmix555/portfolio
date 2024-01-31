import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BoxComponent from "./Box";
import style from "@/styles/Project.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
          <div>
            <img src="/projects/1.png" />
            <p className="legend">SpaceLang</p>
          </div>
          <div>
            <img src="/projects/2.png" />
            <p className="legend">Sakamachi</p>
          </div>
          <div>
            <img src="/projects/3.png" />
            <p className="legend">Foodera</p>
          </div>
          <div>
            <img src="/projects/4.png" />
            <p className="legend">Attendance</p>
          </div>
        </Carousel>
      </div>
    </BoxComponent>
  );
}
