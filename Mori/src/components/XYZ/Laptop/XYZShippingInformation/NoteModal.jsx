import React from 'react';

const NoteModal = ({ isOpen, onClose, receptionNotes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="bg-white p-6 rounded-lg z-50">
        <h2 className="text-lg font-bold">Reception Notes</h2>
        <div className="mt-4">
          <p>{receptionNotes}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
