import { IoCloseSharp } from "react-icons/io5";

interface IConfrimModalProps {
  message: string;
  onClose: () => void;
  onLogOut: () => void;
}
export default function ConfrimModal({
  message,
  onClose,
  onLogOut,
}: IConfrimModalProps) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white z-20 p-10 pt-6 rounded-lg">
      <div className="w-full flex justify-end items-end">
        <IoCloseSharp
          className="w-6 h-6 hover:scale-125 hover:cursor-pointer"
          onClick={() => onClose()}
        />
      </div>
      <p className="text-lg font-semibold text-gray-800 pt-4 text-center">
        {message}
      </p>
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-x-2">
        <button
          className="w-full font-bold py-2 px-4 rounded mt-4 shadow-md bg-gray-400 hover:bg-gray-300 text-white"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button
          className="w-full font-bold py-2 px-4 rounded mt-4 shadow-md bg-sky-600 hover:bg-sky-500 text-white"
          onClick={() => onLogOut()}
        >
          Confrim
        </button>
      </div>
    </div>
  );
}
