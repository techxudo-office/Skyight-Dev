import React from "react";
import Modal from "react-modal";
import "./ModalWrapper.css";
import { MdCancel } from "react-icons/md";
import { CustomTooltip } from "../components";
import { CardLayoutHeader } from "../CardLayout/CardLayout";
export default function ModalWrapper({
  children,
  className,
  header = null,
  isOpen,
  onRequestClose,
  contentLabel,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={60}
      className={`modal-content relative w-[600px] bg-white text-text border-4 rounded-xl border-primary max-h-[90%] overflow-auto  shadow-lg p-6 ${className}`}
      overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center"
      closeTimeoutMS={300}
    >
      {header && <CardLayoutHeader heading={header} />}
      {onRequestClose && (
        <CustomTooltip content={"Close"}>
          <div
            onClick={onRequestClose}
            className="absolute text-2xl cursor-pointer text-redColor top-2 right-2"
          >
            <MdCancel />
          </div>
        </CustomTooltip>
      )}

      {children}
    </Modal>
  );
}
