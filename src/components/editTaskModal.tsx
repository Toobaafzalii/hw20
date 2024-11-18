"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { record, z } from "zod";
import { IoCloseSharp } from "react-icons/io5";
import PocketBase from "pocketbase";
import { title } from "process";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createNewTask, editTask } from "@/api/todo.service";

const checkoutSchema = z.object({
  title: z.string().min(3, "Title must be longer than 3"),
  description: z
    .string()
    .max(50, "Description must be less than 50")
    .min(5, "Description must be longer than 5"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

export default function EditTaskModal(props: IEditTaskModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ITask>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const editedTask = useMutation({
    mutationKey: ["edit-task"],
    mutationFn: (data: ITask) => editTask(data),
  });

  const onSubmit = (data: ITask) => {
    const editedTaskItem = {
      id: props.item.id,
      title: data.title,
      priority: data.priority,
      status: data.status,
      description: data.description,
    };
    editedTask.mutate(editedTaskItem, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetch-todo-tasks"],
        });
        props.onClose();
      },
    });
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white z-10 p-10 pt-6 rounded-lg">
      <form
        className="flex flex-col justify-between items-start gap-4 w-96 max-w-96 pb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-end items-end">
          <IoCloseSharp
            className="w-6 h-6 hover:scale-125 hover:cursor-pointer"
            onClick={props.onClose}
          />
        </div>
        <h2 className="text-2xl font-bold self-center">EDIT TASK</h2>
        <input
          type="text"
          id="title"
          placeholder="NEW TITLE"
          defaultValue={props.item.title}
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
          placeholder="NEW DESCRIPTION"
          defaultValue={props.item.description}
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
          defaultValue={props.item.priority}
          className="w-full py-2 px-2 border-2 rounded-md"
          {...register("priority")}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <label htmlFor="priority" className="text-md font-semibold">
          STATUS:
        </label>
        <select
          id="status"
          defaultValue={props.item.status}
          className="w-full py-2 px-2 border-2 rounded-md"
          {...register("status")}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button
          disabled={!isValid || editedTask.isPending}
          className={`w-full font-bold py-2 px-4 rounded mt-4 shadow-md ${
            isValid || !editedTask.isPending
              ? "bg-sky-600 hover:bg-sky-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {editedTask.isPending ? "SUBMITING..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
