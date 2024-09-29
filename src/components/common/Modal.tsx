import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  id: string;
  children?: React.ReactNode;
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  children,
  id,
  className,
  ...rest
}) => {
  return (
    <div className={`flex flex-col p-4 relative ${className}`} id={id} {...rest}>

      {/* Modal dialog */}
      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* Close button */}
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{message}</p>
            {children}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Modal;
