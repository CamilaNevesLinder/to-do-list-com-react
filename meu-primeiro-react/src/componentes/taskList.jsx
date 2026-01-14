import "./taskList.css";

export function TaskList({ children, className = "task-list" }) {
  return <ul className={className}>{children}</ul>;
}
