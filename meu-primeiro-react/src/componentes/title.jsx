import "./title.css";

export function Title({ className, children }) {
  return <h1 className={className}>{children}</h1>;
}
