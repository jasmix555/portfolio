import BoxComponent from "./Box";
import style from "@/styles/Contact.module.scss";
import Link from "next/link";
import { SiWantedly, SiGithub, SiInstagram, SiGmail } from "react-icons/si";

const contacts = [
  {
    icon: SiGmail,
    link: "mailto:Jasmix555@gmail.com",
  },
  {
    icon: SiInstagram,
    link: "https://www.instagram.com/jason_ng555/",
  },
  {
    icon: SiGithub,
    link: "https://github.com/jasmix555",
  },
  {
    icon: SiWantedly,
    link: "https://www.wantedly.com/id/jason_ng555",
  },
];

function Contact() {
  return (
    <BoxComponent heading="Contact" bgc={"#f5f5f5"} id={"Contact"}>
      <div className={style.wrapper}>
        <div className={style.icons}>
          {contacts.map((e, idx) => (
            <Link href={e.link} key={idx}>
              <e.icon />
            </Link>
          ))}
        </div>
      </div>
      <footer className={style.footer}>
        <p>© 2024 Jason Ng</p>
      </footer>
    </BoxComponent>
  );
}

export default Contact;
