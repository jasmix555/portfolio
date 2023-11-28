import React, { useEffect, useState, useCallback } from "react";
import style from "@/styles/portfolio.module.scss";

function Navbar({ sectionIds }: { sectionIds: string[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    // Determine the active section based on scroll position
    const activeSectionId = sectionIds.find((id) => {
      const section = document.getElementById(id);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;
        return scrollY >= sectionTop && scrollY < sectionBottom;
      }
      return false;
    });

    setActiveSection((prevActiveSection: string | null) => {
      return activeSectionId !== undefined && activeSectionId !== null
        ? activeSectionId
        : prevActiveSection;
    });
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initially, determine the active section when the component is mounted.
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, handleScroll]);

  return (
    <div
      style={{
        position: "fixed",
        top: "0.8rem",
        left: "0.2rem",
        width: "auto",
        flexDirection: "row",
        zIndex: 1000,
        display: "flex",
      }}
      className={style.navbar}
    >
      {sectionIds &&
        sectionIds.map((id) => (
          <div
            key={id}
            style={{
              cursor: "pointer",
              fontSize: "1.6rem",
              marginRight: "1rem",
              textDecoration: "none",
            }}
            className={`${style.box} ${
              activeSection === id ? style.active : ""
            }`}
            onClick={() => handleClick(id)}
          >
            {id}
          </div>
        ))}
    </div>
  );
}

export default Navbar;
