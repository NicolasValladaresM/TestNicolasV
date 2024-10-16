import back from "../../../assets/back.svg";
import Navbar from "../../../components/navbar/navbar";
import { TransContext } from "../../../context/transContext";
import { useContext } from "react";
import Exchange from "../../../services/exchange";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../../../components/modal/modal";
import Modal from "react-modal";
import modal from "/modal.png";

import "./resume.css";

const Resume = () => {
  const { origin, final, amount, rate, fromAmountResume } =
    useContext(TransContext);
  const { openModal, closeModal, modalIsOpen } = ModalDialog();

  const navigate = useNavigate();

  console.log("Valor de amount", amount);

  console.log("Valores desde contextos", origin, final, amount, rate);

  //  console.log("Valres que irian en la api", origin, final)

  
  
  const { MakeExchange } = Exchange();

  const handleConfirm = async () => {
    console.log("Confirmo la transacción");

    // setOrigin(origin.toLowerCase());
    // setOrigin(final.toLowerCase());

    openModal();
    MakeExchange();

    console.log("Valres que irian en la api v2", origin, final, amount);
  };

  useEffect(() => {
  if (!amount || parseFloat(amount) <= 0) {
    console.log("No hay monto a intercambiar");
    // navigate("/interchange");
  } else {
    console.log(`Origin: ${origin}, Final: ${final}, Amount: ${amount} Desde el Resume`);
  }
}, [amount, origin, final, navigate]);  
  

  return (
    <div className="resume">
      <Navbar />

      <div className="general">
        <div className="title">
          <img
            src={back}
            alt="back"
            className="back"
            onClick={() => navigate("/interchange")}
          />
          <h1>Resumen</h1>
        </div>

        <div className="resume-content">
          <div className="monto">
            <p>Monto a Intercambiar</p>
            <p>
              {fromAmountResume} {origin}
            </p>
          </div>
          <div className="monto">
            <p>Tasa de cambio</p>
            <p>
              1 {origin} = {rate ? rate : "Cargando..."} {final}
            </p>
          </div>
          <div className="monto">
            <p>Total a recibir</p>
            <p>
              {amount} {final}
            </p>
          </div>
        </div>

        <div className="footerNav">
          <button className="back" onClick={() => navigate("/interchange")}>
            Atras
          </button>
          <button className="next" onClick={handleConfirm}>
            Intercambiar
          </button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="OverlayModal"
            contentLabel="Example Modal"
          >
            <div className="Modal-content">
              <button onClick={closeModal} className="close">
                Cerrar
              </button>
              <img src={modal} alt="modal" className="modal-image" />
              <h1>Intercambio exitoso</h1>
              <p>Ya cuentas con los {final} en tu saldo.</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Resume;
