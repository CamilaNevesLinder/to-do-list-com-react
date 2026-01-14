import "./iconDelete.css";

export function IconDelete({ className = "icon-delete", onClick }) {
  return (
    <img
      className={className}
      src="/delete.png"
      alt="icone de deletar"
      onClick={onClick}
    />
  );
}
