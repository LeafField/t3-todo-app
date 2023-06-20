import useStore from "../store";
import { api as trpc } from "../utils/api";

export const useMutateTask = () => {
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      const previousTodo = utils.todo.getTasks.getData();
      if (previousTodo) {
        utils.todo.getTasks.setData(undefined, [res, ...previousTodo]);
      }
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previosTodos = utils.todo.getTasks.getData();
      if (previosTodos) {
        utils.todo.getTasks.setData(
          undefined,
          previosTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    onSuccess: (_, valiable) => {
      const previousTodo = utils.todo.getTasks.getData();
      if (previousTodo) {
        utils.todo.getTasks.setData(
          undefined,
          previousTodo.filter((task) => task.id !== valiable.taskId)
        );
      }
      reset();
    },
  });

  return { createTaskMutation, deleteTaskMutation, updateTaskMutation };
};
