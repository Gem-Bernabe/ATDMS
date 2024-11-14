import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
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
  );
};

export default Modal;
