import React from "react";
import { api as trpc } from "../utils/api";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { data, error, isLoading } = trpc.todo.getTasks.useQuery();
  if (isLoading) return <p>Loading task list...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {data.map((task) => (
        <TaskItem
          taskId={task.id}
          body={task.body}
          title={task.title}
          key={task.id}
        />
      ))}
    </ul>
  );
};
