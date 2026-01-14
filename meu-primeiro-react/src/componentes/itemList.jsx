import "./itemList.css";

export function ItemList({ children, className = "item-list" }) {
  return <li className={className}>{children}</li>;
}
