import React from "react";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

const Table = ({ tasks }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Task", "Goal", "Estimated Time", "Completed"].map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              {task.name}
              <TaskItem />
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
};

export default Table;
