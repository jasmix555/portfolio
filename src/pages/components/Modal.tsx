// Modal.js
import style from "@/styles/Modal.module.scss";

type Props = {
  selectedWork: any;
  closeModal: () => void;
};

export default function Modal({ selectedWork, closeModal }: Props) {
  if (!selectedWork) return null;

  return (
    <div className={style.modalWrapper}>
      <div className={style.modalBackground} onClick={closeModal}></div>
      <div className={style.modalContent}>
        {/* Add your modal content here */}
        <h2>{selectedWork.title}</h2>
        {/* Display other details about the selected work */}
        {/* ... */}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
