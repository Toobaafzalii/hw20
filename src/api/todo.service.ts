import { BASE_URL, client } from "./client";

export const createNewTask = async (data: INewTask) => {
  await client.collection("todos").create(data);
};

export const fetchTasks = async (
  status: IStatus
): Promise<TodoTasksResponse> => {
  const response = await client.collection("todos").getList<ITask>(1, 50, {
    filter: `status = "${status}"`,
  });
  return response;
};

export const deleteTodoTask = async (id: string) => {
  await client.collection("todos").delete(id);
};

export const editTask = async (data: ITask) => {
  const response = await client.collection("todos").update(`${data.id}`, data);
  return response;
};
