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

  const fixedTasks = [
    {
      id: "fixed-1",
      text: "tarefa fixa 1",
      done: false,
      date: new Date().toLocaleDateString("pt-BR"),
    },
    {
      id: "fixed-2",
      text: "tarefa fixa 2",
      done: false,
      date: new Date().toLocaleDateString("pt-BR"),
    },
  ];

  const [tasks, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    const userTasks = savedTasks ? JSON.parse(savedTasks) : []; // se houver algo no localStorage com a chave tasks, o savedTasks sera uma string com esse valor

    const userTaskIds = userTasks.map((task) => task.id);

    const missingFixedTasks = fixedTasks.filter(
      (fixed) => !userTaskIds.includes(fixed.id)
    );

    return [...missingFixedTasks, ...userTasks];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  function saveTask() {
    const value = inputRef.current.value;
    if (value.trim() === "") return;

    const today = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    setTask([...tasks, { text: value, done: false, date: today }]);
    inputRef.current.value = "";
  }

  function toggleCheck(id) {
    const newTasks = [...tasks];
    newTasks[id].done = !newTasks[id].done;
    setTask(newTasks);
  }

  function deleteTask(idToDelete) {
    const newTasks = tasks.filter((_, id) => id !== idToDelete);
    setTask(newTasks);
  }

  function openEditModal(item, id) {
    setEditValue(item.text);
    setEditId(id);
    setIsModalOpen(true);
  }

  function saveEdit() {
    const updateTasks = [...tasks];
    updateTasks[editId] = { ...updateTasks[editId], text: editValue };
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
        {tasks.map((task, id) => (
          <ItemList key={id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleCheck(id)}
            />
            <div className="div-date-under-task">
              <span
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <small className="task-date">{task.date}</small>
            </div>

            <div className="div-icons">
              <IconDelete onClick={() => deleteTask(id)}>
                <img
                  src="meu-primeiro-react/public/delete.png"
                  alt="icone de deletar"
                />
              </IconDelete>
              <IconEdit onClick={() => openEditModal(task, id)}>
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
