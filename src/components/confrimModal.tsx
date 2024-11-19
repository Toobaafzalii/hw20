import { IoCloseSharp } from "react-icons/io5";

interface IConfirmModalProps {
  message: string;
  onClose: () => void;
  onLogOut: () => void;
}

export default function ConfirmModal({
  message,
  onClose,
  onLogOut,
}: IConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white p-6 pt-4 rounded-lg shadow-md w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <div className="w-full flex justify-end items-end">
          <IoCloseSharp
            className="w-6 h-6 hover:scale-125 hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <p className="text-lg font-semibold text-gray-800 pt-4 text-center">
          {message}
        </p>
        <div className="w-full flex flex-col md:flex-row justify-start items-center gap-x-2 ">
          <button
            className="w-full font-bold py-2 px-4 rounded mt-4 shadow-md bg-gray-400 hover:bg-gray-300 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full font-bold py-2 px-4 rounded mt-4 shadow-md bg-sky-600 hover:bg-sky-500 text-white"
            onClick={onLogOut}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
