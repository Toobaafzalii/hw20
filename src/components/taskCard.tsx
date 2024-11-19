"use client";
import { useState } from "react";
import EditTaskModal from "./editTaskModal";
import ConfirmModal from "./confrimModal";
import {
  FcMediumPriority,
  FcLowPriority,
  FcHighPriority,
} from "react-icons/fc";

interface ITaskCardProps {
  item: ITask;
  onDelete: (id: string) => void;
}

export default function TaskCard(props: ITaskCardProps) {
  const item = props.item;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const onDeleteTask = (id: string) => {
    props.onDelete(id);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDeleteTask(item.id);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="bg-white flex flex-col justify-between items-start p-4 gap-3 shadow-xl hover:shadow-2xl hover:cursor-default rounded-xl">
      <div className="w-full flex justify-between items-center px-1">
        <p
          className="text-xl font-bold text-gray-800 truncate"
          title={item.title}
        >
          {item.title}
        </p>
        {(() => {
          switch (item.priority) {
            case "LOW":
              return <FcLowPriority className=" w-5 h-5 hover:scale-125" />;
            case "MEDIUM":
              return <FcMediumPriority className="w-5 h-5  hover:scale-125" />;
            case "HIGH":
              return <FcHighPriority className="w-5 h-5  hover:scale-125" />;
            default:
              return <FcLowPriority className="w-5 h-5  hover:scale-125" />;
          }
        })()}
      </div>
      <p
        className="text-sm font-normal text-gray-500 px-1.5 truncate"
        title={item.description}
      >
        {item.description}
      </p>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-400 w-full py-1.5 px-2 text-white font-medium rounded-md shadow-md"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-400 w-full py-1.5 px-2 text-white rounded-md font-medium shadow-md"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          Delete
        </button>
      </div>

      {isEditModalOpen && (
        <EditTaskModal item={props.item} onClose={handleCloseEditModal} />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          message="Sure you want to delete this task?"
          onClose={handleCloseConfirmModal}
          onLogOut={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
