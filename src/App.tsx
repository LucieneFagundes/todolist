import { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "./components/Header";
import { NoItems } from "./components/NoItems";
import { TaskItems } from "./components/TaskItems";
import { PlusCircle } from "phosphor-react";
import styles from "./App.module.css";
import { v4 as uuid } from "uuid";

interface ITask {
  id: string;
  content: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState(0);

  let countTaskDone;

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, { id: uuid(), content: newTask, done: false }]);
    setNewTask("");
  }

  function newTaskChanged(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  function doneTask(taskToDone: string) {
    const isDone = tasks.findIndex((task) => {
      return task.id === taskToDone;
    });
    tasks[isDone].done = !tasks[isDone].done;

    countTaskDone = tasks.filter((task) => task.done === true).length;
    setTasksCompleted(countTaskDone);
  }

  function deleteTask(taskToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      return task.id != taskToDelete;
    });

    setTasks(taskWithoutDeletedOne);
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateTask} className={styles.boxAddTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTask}
            onChange={newTaskChanged}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} weight="bold" />
          </button>
        </form>
        <div className={styles.boxTasks}>
          <div className={styles.taskStatus}>
            <p>
              Tarefas criadas <span>{tasks.length}</span>
            </p>
            <p>
              Concluídas{" "}
              <span>
                {" "}
                {tasksCompleted} de {tasks.length}
              </span>
            </p>
          </div>
          <div className={styles.taskList}>
            {tasks.length != 0 ? (
              <>
                {tasks.map((task) => {
                  return (
                    <TaskItems
                      key={task.id}
                      task={task}
                      onDoneTask={doneTask}
                      onDeleteTask={deleteTask}
                    />
                  );
                })}
              </>
            ) : (
              <NoItems />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
