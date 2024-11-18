"use client";
import {
  deleteTodoTask,
  fetchCompeletedTasks,
  fetchInProgressTasks,
  fetchTodoTasks,
} from "@/api/todo.service";
import CardSkeleton from "@/components/cardSkeleton";
import TaskCard from "@/components/taskCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { todo } from "node:test";
import { RiProgress8Line } from "react-icons/ri";

export default function Compeleted() {
  const todoTasks = useQuery({
    queryKey: ["fetch-todo-tasks"],
    queryFn: () => fetchCompeletedTasks(),
    refetchOnMount: true,
    staleTime: 0,
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => deleteTodoTask(id),
    onSuccess: () => {
      todoTasks.refetch();
    },
  });

  const onDelete = (id: string) => {
    deleteTask.mutate(id);
  };

  return (
    <div className="w-full  bg-gradient-to-br from-gray-50 via-teal-50 to-teal-100  min-h-screen p-10">
      <div className="flex items-center gap-1.5 p-4">
        <RiProgress8Line className="w-8 h-8" />
        <p className="text-3xl font-bold text-gray-800 ">COMPELETED TASKS</p>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-3">
        {(todoTasks.isPending || todoTasks.isLoading) &&
          [1, 2, 3, 4, 5, 6, 7].map((number) => <CardSkeleton key={number} />)}
        {todoTasks.isFetched &&
          todoTasks.data?.items.map((item: ITask) => (
            <TaskCard key={item.id} item={item} onDelete={onDelete} />
          ))}
      </div>
    </div>
  );
}
