import { Children } from "react";
import "./text.css";

export function Text({ className = "primaryText", children }) {
  return <p className={className}>{children}</p>;
}
