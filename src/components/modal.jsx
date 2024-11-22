import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-6 rounded shadow-lg">
            {children}
            <button
              onClick={onClose}
              className="mt-4 w-full text-center py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
