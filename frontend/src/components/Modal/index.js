import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ children, onHide }) {
    const [modalEl, setModalEl] = useState(document.getElementById("modal"));
    useEffect(() => {
        setModalEl(document.getElementById("modal"));
    }, []);
    return modalEl
        ? ReactDOM.createPortal(
              <div
                  className="modal-content"
                  onClick={(e) => {
                      e.stopPropagation();
                      onHide();
                  }}
              >
                  <div className="modal-backdrop"></div>
                  <div className="modal-inner-content">{children}</div>
              </div>,
              modalEl
          )
        : null;
}
export default Modal;
