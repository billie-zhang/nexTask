import React from "react";
import PropTypes from "prop-types";
import { formatPercentage, totalTasksCompleted } from "../helpers";
import { Form, Link } from "react-router-dom";

const GoalItem = ({ goal, showDelete = false }) => {
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
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action={`/goal/${name}/delete/${id}`}
            onSubmit={(event) => {
              if (!confirm("Are you sure you want to delete this goal?")) {
                event.preventDefault();
              }
            }}
          >
            <button name="goalId" value={id} type="submit" className="btn">
              <span>Delete Goal</span>
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link
            to={`/goal/${name}`}
            style={{ "--accent": color }}
            className="btn btn--primary"
          >
            <span>View Details</span>
          </Link>
        </div>
      )}
    </div>
  );
};

GoalItem.propTypes = {
  showDelete: PropTypes.bool,
  goal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    priorityLevel: PropTypes.number.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

export default GoalItem;
