import { Trash } from "phosphor-react";
import styles from "./TaskItems.module.css";

interface Task {
  id: string;
  content: string;
  done: boolean;
}

interface TasksProps {
  task: Task;
  onDeleteTask: (task: string) => void;
  onDoneTask: (task: string) => void;
}

export function TaskItems({ task, onDeleteTask, onDoneTask }: TasksProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleCheckboxChange() {
    onDoneTask(task.id);
  }

  return (
    <div className={styles.taskItems}>
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={handleCheckboxChange}
        />
      </div>
      <span className={task.done == true ? styles.taskChecked : styles.taskUnchecked}>
        {task.content}
      </span>
      <button>
        <Trash size={24} onClick={handleDeleteTask} />
      </button>
    </div>
  );
}
