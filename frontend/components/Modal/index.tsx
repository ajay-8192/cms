import React, { ReactElement } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactElement;
  onClose: () => void;
}) => {
  const handleClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      onClick={handleClick}
    >
      <div className="bg-white p-8 rounded-2xl">{children}</div>
    </div>
  );
};

export default Modal;
