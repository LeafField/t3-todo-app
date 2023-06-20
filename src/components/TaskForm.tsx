import React, { FormEvent } from "react";
import useStore from "../store";
import { useMutateTask } from "../hooks/useMutateTask";

export const TaskForm = () => {
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  const { editedTask } = useStore();
  const update = useStore((store) => store.updateEditedTask);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.taskId === "") {
      createTaskMutation.mutate({
        body: editedTask.body,
        title: editedTask.title,
      });
    } else {
      updateTaskMutation.mutate({
        taskId: editedTask.taskId,
        body: editedTask.body,
        title: editedTask.title,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {(createTaskMutation.isLoading || updateTaskMutation.isLoading) && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
      <input
        type="text"
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="Title"
        value={editedTask.title || ""}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.title}
      </p>
      <textarea
        placeholder="Body"
        className="mb-3 border border-gray-300 px-3 py-2"
        value={editedTask.body || ""}
        onChange={(e) => update({ ...editedTask, body: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.body}
      </p>

      <button className="rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700 focus:outline-none ">
        {editedTask.taskId === `` ? "Create" : "Update"}
      </button>
    </form>
  );
};
