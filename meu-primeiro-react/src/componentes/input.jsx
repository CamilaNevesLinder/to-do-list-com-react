import { forwardRef } from "react";
import "./input.css";

export const InputText = forwardRef(({ className, value, onChange }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      placeholder="Crie uma tarefa..."
    />
  );
});

//fowardRef é uma função que retorna outra função, por isso não pode ser export function e sim const
//precisei usar o fowardRef para que o meu ref alcance o componente, o ref manipula elementos html normalmente e não componentes
