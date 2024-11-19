import { fetchTasks } from "@/api/todo.service";
import { useQuery } from "@tanstack/react-query";

interface Props {
  status: IStatus;
}

const useTodos = (props: Props) => {
  const { status } = props;
  const todoTasks = useQuery({
    queryKey: ["fetch-todo-tasks"],
    queryFn: () => fetchTasks(status),
    refetchOnMount: true,
    staleTime: 0,
  });

  return todoTasks;
};

export default useTodos;
