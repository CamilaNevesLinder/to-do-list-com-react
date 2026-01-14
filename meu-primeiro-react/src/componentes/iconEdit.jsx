import "./iconEdit.css";

export function IconEdit({ className = "icon-edit", onClick }) {
  return (
    <img
      className={className}
      src="/pen.png"
      alt="icone de editar"
      onClick={onClick}
    />
  );
}
