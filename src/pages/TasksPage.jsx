import React from "react";
import { deleteItem, fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function tasksLoader() {
  const tasks = fetchData("tasks");
  return { tasks };
}

export async function tasksAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteTask") {
    try {
      // delete task
      deleteItem({
        key: "tasks",
        id: values.taskId,
      });

      return toast.success("Task deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your task.");
    }
  }
}

const TasksPage = () => {
  const { tasks } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <div className="grid-md">
          <Table tasks={tasks} />
        </div>
      ) : (
        <p>no tasks yet</p>
      )}
    </div>
  );
};

export default TasksPage;
