import { BASE_URL, client } from "./client";

export const createNewTask = async (data: INewTask) => {
  await client.collection("todos").create(data);
};

export const fetchTodoTasks = async (): Promise<TodoTasksResponse> => {
  const response = await client.collection("todos").getList<ITask>(1, 50, {
    filter: 'status = "TODO"',
  });
  return response;
};

export const fetchInProgressTasks = async (): Promise<TodoTasksResponse> => {
  const response = await client.collection("todos").getList<ITask>(1, 50, {
    filter: 'status = "IN_PROGRESS"',
  });
  return response;
};

export const fetchCompeletedTasks = async (): Promise<TodoTasksResponse> => {
  const response = await client.collection("todos").getList<ITask>(1, 50, {
    filter: 'status = "DONE"',
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
