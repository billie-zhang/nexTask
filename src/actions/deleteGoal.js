import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteGoal({ params }) {
  try {
    deleteItem({
      key: "goals",
      id: params.id,
    });

    const associatedTasks = getAllMatchingItems({
      category: "tasks",
      key: "goalId",
      value: params.id,
    });

    associatedTasks.forEach((task) => {
      deleteItem({
        key: "tasks",
        id: task.id,
      });
    });
    toast.success("Goal deleted");
  } catch (e) {
    throw new Error("There was a problem deleting your goal.");
  }
  return redirect("/");
}
