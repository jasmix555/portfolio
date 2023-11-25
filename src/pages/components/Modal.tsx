// Modal.js
import { motion, AnimatePresence } from "framer-motion";
import style from "@/styles/Modal.module.scss";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";

type Props = {
  selectedWork: any;
  closeModal: () => void;
};

const Modal = ({ selectedWork, closeModal }: Props) => {
  return (
    <AnimatePresence>
      {selectedWork && (
        <motion.div
          className={`${style.modalWrapper} body`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={style.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2>{selectedWork.title}</h2>
            <div></div>
            <button onClick={closeModal} className={style.closeBtn}>
              <FaXmark />
            </button>
            <Link href={selectedWork.link} className={style.link}>
              <span>見に行く</span>
            </Link>
          </motion.div>
          <div className={style.modalBackground} onClick={closeModal}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
