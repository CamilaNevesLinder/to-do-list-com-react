import "./App.css";
import { Title } from "./componentes/title";
import { Text } from "./componentes/text";
import { InputText } from "./componentes/input";
import { Button } from "./componentes/button";
import { TaskList } from "./componentes/taskList";
import { ItemList } from "./componentes/itemList";
import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);

  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  function saveTask() {
    const value = inputRef.current.value;
    if (value.trim() === "") return;

    setTask([...task, { text: value, done: false }]);
    inputRef.current.value = "";
  }

  function toggleCheck(index) {
    const newTasks = [...task];
    newTasks[index].done = !newTasks[index].done;
    setTask(newTasks);
  }

  return (
    <div className="box-task">
      <Title className="primary-title">To-do list</Title>
      <Text>Tarefas da semana</Text>

      <div className="create-task">
        <InputText ref={inputRef} />
        <Button className="primary-button" onClick={saveTask}>
          Salvar
        </Button>
      </div>

      <TaskList>
        {task.map((item, index) => (
          <ItemList key={index}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleCheck(index)}
            />
            <span
              style={{ textDecoration: item.done ? "line-through" : "none" }}
            >
              {item.text}
            </span>
          </ItemList>
        ))}
      </TaskList>
    </div>
  );
}

export default App;
