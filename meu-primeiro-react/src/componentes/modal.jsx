import "./modal.css";
import { InputText } from "./input";
import { Button } from "./button";

export function Modal({ isOpen, onClose, onSave, value, setValue }) {
  if (!isOpen) return null;

  return (
    <div className="modal-edit-task">
      <div className="modal-content">
        <InputText
          className="input-edit-task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="modal-button">
          <Button className="button-save-edit" onClick={onSave}>
            Salvar
          </Button>
          <Button className="button-calcel-edit" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
