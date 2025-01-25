import React from "react";
import {
  createTask,
  deleteItem,
  fetchData,
  getAllMatchingItems,
} from "../helpers";
import { useLoaderData } from "react-router-dom";
import GoalItem from "../components/GoalItem";
import AddBreakdownTaskForm from "../components/AddBreakdownTaskForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

//loader
export async function goalLoader({ params }) {
  const goals = fetchData("goals") || [];
  const goal = goals.find((item) => item.name === params.name);

  if (!goal) {
    throw new Error("The goal you're trying to view doesn't exist.");
  }

  const tasks =
    fetchData("tasks")?.filter((task) => task.goalId === goal.id) || [];

  return { goal, tasks };
}

// action
export async function goalAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createTask") {
    try {
      // create task
      createTask({
        name: values.taskName,
        estimatedTime: values.estimatedTime,
        goalId: values.newBreakdownTaskGoal,
        completed: false,
      });

      return toast.success(`Task created: ${values.taskName}`);
    } catch (error) {
      throw new Error("There was a problem creating your task.");
    }
  }

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

const GoalPage = () => {
  const { goal, tasks } = useLoaderData();

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": goal.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{goal.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <GoalItem goal={goal} showDelete={true} />
        <AddBreakdownTaskForm goals={[goal]} />
      </div>
      {tasks && tasks.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{goal.name} </span> Tasks
          </h2>
          <Table tasks={tasks} showGoal={false} />
        </div>
      )}
    </div>
  );
};

export default GoalPage;
