import React from "react";
import PropTypes from "prop-types";
import { formatPercentage, totalTasksCompleted } from "../helpers";

const GoalItem = ({ goal }) => {
  const { id, name, priorityLevel, color } = goal;
  const tasksCompleted = totalTasksCompleted(id);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name} </h3>
        <p>Priority {priorityLevel}</p>
      </div>
      {/* TODO: change max level to be number of breakdown tasks */}
      <progress max={50} value={tasksCompleted}>
        {/* change 50 to number of total tasks */}
        {formatPercentage(tasksCompleted / 50)}
        <div className="progress-bar" style={{ width: "50%" }}></div>
      </progress>
      <div className="progress-text">
        <small>{tasksCompleted} tasks completed</small>
        <small>... tasks remaining</small>
      </div>
    </div>
  );
};

GoalItem.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    priorityLevel: PropTypes.number.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

export default GoalItem;
