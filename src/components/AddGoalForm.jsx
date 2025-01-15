import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

const AddGoalForm = () => {
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
      <h2 className="h3">Create Goal</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="goalName">Goal Name</label>
          <input
            type="text"
            name="goalName"
            id="goalName"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="priorityLevel">Priority</label>
          <input
            type="number"
            step="1"
            name="priorityLevel"
            id="priorityLevel"
            placeholder="e.g., 1"
            required
            inputMode="numeric"
          />
        </div>
        <input type="hidden" name="_action" value="createGoal" />
        <button
          type="submit"
          className="btn btn--dark "
          disabled={isSubmitting}
        >
          <span>Create Goal</span>
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddGoalForm;
