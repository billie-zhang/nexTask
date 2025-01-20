import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  fetchData,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const TaskItem = ({ task, onTaskUpdate }) => {
  const fetcher = useFetcher();
  const goal = getAllMatchingItems({
    category: "goals",
    key: "id",
    value: task.goalId,
  })[0];

  const [completed, setCompleted] = useState(task.completed);

  const handleCheckboxChange = () => {
    const updatedCompleted = !completed;
    setCompleted(updatedCompleted);

    // Update the task in localStorage
    const tasks = fetchData("tasks") || [];
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: updatedCompleted } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    onTaskUpdate({ updatedTasks });
  };

  return (
    <>
      <td>{task.name}</td>
      <td>{task.estimatedTime} mins</td>
      <td>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        <Link to={`/goal/${goal.name}`} style={{ "--accent": goal.color }}>
          {goal.name}
        </Link>
      </td>
      <td>
        <fetcher.Form method="post" className="grid-sm">
          <input type="hidden" name="_action" value="deleteTask" />
          <button
            name="taskId"
            value={task.id}
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${task.name} task`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
      {/* to display date */}
      {/* <td>{formatDateToLocaleString(task.createdAt)}</td> */}
    </>
  );
};
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    goalId: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default TaskItem;
