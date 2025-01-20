import React from "react";
import { fetchData, getAllMatchingItems } from "../helpers";
import { useLoaderData } from "react-router-dom";
import GoalItem from "../components/GoalItem";
import AddBreakdownTaskForm from "../components/AddBreakdownTaskForm";
import Table from "../components/Table";

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

const GoalPage = () => {
  const { goal, tasks } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1 className="h2">
        <span className="accent">{goal.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <GoalItem goal={goal} />
        <AddBreakdownTaskForm goals={[goal]} />
      </div>
      {tasks && tasks.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{goal.name} </span> Tasks
          </h2>
          <Table tasks={tasks} />
        </div>
      )}
    </div>
  );
};

export default GoalPage;
