interface INewTask {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

interface INewTaskModalProps {
  onClose: () => void;
}

interface IEditTaskModalProps {
  onClose: () => void;
  item: ITask;
}

interface ITask extends INewTask {
  id: string;
  status: string;
}

interface TodoTasksResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: ITask[];
}

type IStatus = "DONE" | "IN_PROGRESS" | "TODO";
