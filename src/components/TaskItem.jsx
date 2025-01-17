import React from "react";
import PropTypes from "prop-types";
import { formatDateToLocaleString } from "../helpers";

const TaskItem = ({ task }) => {
  return (
    <>
      <td>{task.name}</td>
      <td>{task.estimatedTime} mins</td>
      {/* <td>{task.completed}</td> */}
      {/* to display date */}
      {/* <td>{formatDateToLocaleString(task.createdAt)}</td> */}
    </>
  );
};
TaskItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default TaskItem;
