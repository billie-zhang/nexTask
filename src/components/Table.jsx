import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import { fetchData } from "../helpers";

const Table = ({ tasks, showGoal = true }) => {
  const [taskList, setTaskList] = useState(fetchData("tasks") || []);

  const handleTaskUpdate = (updatedTasks) => {
    setTaskList(updatedTasks); // Update the state with the updated tasks
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {[
              "Task",
              "Estimated Time",
              "Completed",
              showGoal ? "Goal" : "",
              "",
            ].map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <TaskItem
                task={task}
                onTaskUpdate={handleTaskUpdate}
                showGoal={showGoal}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  showGoal: PropTypes.bool,
};

export default Table;
