import { Text, Flex } from "@chakra-ui/react";
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
    <Flex
      position={"fixed"}
      top={"0.8rem"}
      left={"0.2rem"}
      w={"auto"}
      flexDir={"row"}
      zIndex={1000}
      className={style.navbar}
    >
      {sectionIds &&
        sectionIds.map((id) => (
          <Text
            key={id}
            cursor={"pointer"}
            className={`${style.box} ${
              activeSection === id ? style.active : ""
            }`}
            onClick={() => handleClick(id)}
            fontSize={"1.6rem"}
          >
            {id}
          </Text>
        ))}
    </Flex>
  );
}

export default Navbar;
