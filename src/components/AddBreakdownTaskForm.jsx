import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useFetcher } from "react-router-dom";

const AddBreakdownTaskForm = ({ goals }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {goals.length === 1 && `${goals.map((goal) => goal.name)}`}{" "}
        </span>
        Breakdown Task
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              name="taskName"
              id="taskName"
              placeholder="e.g., Groceries"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="estimatedTime">Estimated Time (mins)</label>
            <input
              type="number"
              step="1"
              name="estimatedTime"
              id="estimatedTime"
              placeholder="e.g., 5 mins"
              required
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="grid-xs" hidden={goals.length === 1}>
          <label htmlFor="newBreakdownTaskGoal">Goal Category</label>
          <select
            name="newBreakdownTaskGoal"
            id="newBreakdownTaskGoal"
            required
          >
            {goals
              .sort((a, b) => a.createAt - b.createdAt)
              .map((goal) => {
                return (
                  <option key={goal.id} value={goal.id}>
                    {goal.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createTask" />
        <button
          type="submit"
          className="btn btn--dark "
          disabled={isSubmitting}
        >
          <span>Add Task</span>
        </button>
      </fetcher.Form>
    </div>
  );
};
AddBreakdownTaskForm.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AddBreakdownTaskForm;
