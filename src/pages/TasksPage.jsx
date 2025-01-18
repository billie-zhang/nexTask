import React from "react";
import { fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";

export function tasksLoader() {
  const tasks = fetchData("tasks");
  return { tasks };
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
