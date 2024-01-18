import BoxComponent from "./Box";
import style from "@/styles/Contact.module.scss";
import Link from "next/link";
import { SiWantedly, SiGithub, SiInstagram } from "react-icons/si";

function Contact() {
  return (
    <BoxComponent heading="Contact" bgc={"#f5f5f5"} id={"Contact"}>
      <div className={style.wrapper}>
        <Link href={"https://www.instagram.com/jason_ng555/"}>
          <SiInstagram />
        </Link>
        <Link href={"https://github.com/jasmix555"}>
          <SiGithub />
        </Link>
        <Link href={"https://www.wantedly.com/id/jason_ng555"}>
          <SiWantedly />
        </Link>
      </div>
    </BoxComponent>
  );
}

export default Contact;
