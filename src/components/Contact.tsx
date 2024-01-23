import BoxComponent from "./Box";
import style from "@/styles/Contact.module.scss";
import Link from "next/link";
import { SiWantedly, SiGithub, SiInstagram, SiGmail } from "react-icons/si";

const contacts = [
  {
    icon: SiGmail,
    link: "mailto:Jasmix555@gmail.com",
    text: "Send Mail",
  },
  {
    icon: SiInstagram,
    link: "https://www.instagram.com/jason_ng555/",
    text: "Instagram Profile",
  },
  {
    icon: SiGithub,
    link: "https://github.com/jasmix555",
    text: "GitHub Profile",
  },
  {
    icon: SiWantedly,
    link: "https://www.wantedly.com/id/jason_ng555",
    text: "Wantedly Profile",
  },
];

function Contact() {
  return (
    <BoxComponent heading="Contact" id={"Contact"}>
      <div className={style.wrapper}>
        <div className={style.icons}>
          {contacts.map((e, idx) => (
            <div data-name={`${e.text}`} className={style.box}>
              <Link href={e.link} key={idx}>
                <e.icon />
              </Link>
            </div>
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
