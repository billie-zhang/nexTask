import React, { useState } from "react";
import PropTypes from "prop-types";
import { fetchData, formatDateToLocaleString } from "../helpers";

const TaskItem = ({ task, onTaskUpdate }) => {
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
    completed: PropTypes.bool,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default TaskItem;
