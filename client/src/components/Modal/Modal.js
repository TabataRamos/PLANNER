import "./Modal.css";
import { useState } from "react";

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => closeModal(false)}>X</button>
        <div className="title"></div>
        <h1>Edit</h1>
        <div className="body"></div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Modal;
