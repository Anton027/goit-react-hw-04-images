import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
    useEffect(() => {
        const hendelKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', hendelKeyDown);

        return () => window.removeEventListener('keydown', hendelKeyDown)
    }, [onClose]);

    const handleBackDropClick = e => {
        console.log(e.currentTarget);
        console.log(e.target);
        if (e.currentTarget === e.target) {
            onClose();
        }
    }
    return createPortal(
        <div className={css.Overlay} onClick={handleBackDropClick}>
            <div className={css.Modal}>
                {children}
            </div>
        </div>,
        modalRoot,
    )
}

export default Modal;