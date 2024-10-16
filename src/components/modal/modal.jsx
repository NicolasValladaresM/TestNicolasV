import "./modal.css";
import { useState } from "react";

const ModalDialog = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { openModal, closeModal, modalIsOpen };
};

export default ModalDialog;
