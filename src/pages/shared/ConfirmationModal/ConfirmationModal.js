import React from "react";

const ConfirmationModal = ({
  title,
  message,
  closeModal,
  successAction,
  modalData,
  ActionBtn,
}) => {
  return (
    <div>
      <input type="checkbox" id="ConfirmationModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="ConfirmationModal"
              className="btn btn-primary"
            >
              {ActionBtn}
            </label>
            <label
              onClick={closeModal}
              htmlFor="ConfirmationModal"
              className="btn"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
