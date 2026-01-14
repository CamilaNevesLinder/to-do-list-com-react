import "./App.css";
import { Title } from "./componentes/title";
import { Text } from "./componentes/text";
import { InputText } from "./componentes/input";
import { Button } from "./componentes/button";
import { TaskList } from "./componentes/taskList";
import { ItemList } from "./componentes/itemList";
import { useEffect, useRef, useState } from "react";
import { IconDelete } from "./componentes/iconDelete";
import { IconEdit } from "./componentes/iconEdit";
import { Modal } from "./componentes/modal";

function App() {
  const inputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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

  function deleteTask(indexToDelete) {
    const newTasks = task.filter((_, index) => index !== indexToDelete);
    setTask(newTasks);
  }

  function openEditModal(item, index) {
    setEditValue(item.text);
    setEditIndex(index);
    setIsModalOpen(true);
  }

  function saveEdit() {
    const updateTasks = [...task];
    updateTasks[editIndex] = { ...updateTasks[editIndex], text: editValue };
    setTask(updateTasks);
    setIsModalOpen(false);
  }

  return (
    <div className="box-task">
      <Title className="primary-title">To-do list</Title>
      <Text>Tarefas da semana</Text>

      <div className="create-task">
        <InputText className="input-text" ref={inputRef} />
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
              style={{
                textDecoration: item.done ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>
            <div className="div-icons">
              <IconDelete onClick={() => deleteTask(index)}>
                <img
                  src="meu-primeiro-react/public/delete.png"
                  alt="icone de deletar"
                />
              </IconDelete>
              <IconEdit onClick={() => openEditModal(item, index)}>
                <img
                  src="meu-primeiro-react/public/pen.png"
                  alt="icone de editar"
                />
              </IconEdit>
            </div>
          </ItemList>
        ))}
      </TaskList>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveEdit}
        value={editValue}
        setValue={setEditValue}
      />
    </div>
  );
}

export default App;
