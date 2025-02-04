import { PropsWithChildren, useState } from "react";

export default function DashboardLayout(props: PropsWithChildren) {
  return (
    <div>
      <aside>
        <a href="/dashboard">Dashboard</a>
        <span>{" | "}</span>
        <a href="/dashboard/settings">Settings</a>
        <span>{" | "}</span>
        <Counter />
      </aside>
      {props?.children}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Dashboard Counter {count}
    </button>
  );
}
