import { editTask } from "@/api/todo.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { z } from "zod";

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
      onClick={props.onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white p-6 pt-4 rounded-lg shadow-md w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <form
          className="flex flex-col gap-4 w-full"
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
            className={`w-full font-bold py-2 px-4 rounded mt-4 shadow-md mb-6 ${
              isValid || !editedTask.isPending
                ? "bg-sky-600 hover:bg-sky-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {editedTask.isPending ? "SUBMITING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
