"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask } from "@/api/todo.service";
import { z } from "zod";

const checkoutSchema = z.object({
  title: z.string().min(3, "Title must be longer than 3"),
  description: z
    .string()
    .max(50, "Description must be less than 50")
    .min(5, "Description must be longer than 5"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export default function NewTaskModal({ onClose }: INewTaskModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<INewTask>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const newTask = useMutation({
    mutationKey: ["add-new-task"],
    mutationFn: (data: INewTask) => createNewTask(data),
  });

  const onSubmit = (data: INewTask) => {
    const NewTaskItem = {
      title: data.title,
      priority: data.priority,
      status: "TODO",
      description: data.description,
    };
    newTask.mutate(NewTaskItem, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetch-todo-tasks"],
        });

        onClose();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 pt-4 rounded-lg shadow-md w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="flex flex-col justify-between items-start gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex justify-end items-end">
            <IoCloseSharp
              className="w-6 h-6 hover:scale-125 hover:cursor-pointer"
              onClick={onClose}
            />
          </div>
          <h2 className="text-2xl font-bold self-center">NEW TASK</h2>
          <input
            type="text"
            id="title"
            placeholder="TITLE"
            {...register("title")}
            className="w-full p-2 border-2 rounded-md"
          />
          {errors.title?.message && (
            <p className="text-red-700 text-md font-normal">
              {errors.title.message}
            </p>
          )}
          <input
            type="text"
            id="description"
            placeholder="DESCRIPTION"
            {...register("description")}
            className="w-full p-2 border-2 rounded-md"
          />
          {errors.description?.message && (
            <p className="text-red-700 text-md font-normal">
              {errors.description.message}
            </p>
          )}
          <label htmlFor="priority" className="text-md font-semibold">
            PRIORITY:
          </label>
          <select
            id="priority"
            className="w-full py-2 px-2 border-2 rounded-md"
            {...register("priority")}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
          <button
            disabled={!isValid}
            className={`w-full font-bold py-2 px-4 rounded mt-4 shadow-md mb-6 ${
              isValid
                ? "bg-sky-600 hover:bg-sky-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {newTask.isPending ? "ADDING THE TASK..." : "ADD"}
          </button>
        </form>
      </div>
    </div>
  );
}
