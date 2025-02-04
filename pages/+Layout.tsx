import getTitle from "@/utils/get-title";
import { useState, type PropsWithChildren } from "react";
import { useMetadata } from "vike-metadata-react";

useMetadata.setGlobalDefaults({
  title: getTitle("Home"),
  description: "Demo showcasing Vike and Solid.",
});

export default function RootLayout(props: PropsWithChildren) {
  return (
    <>
      <div>
        <nav>
          <a href="/">Home</a>
          <span>{" | "}</span>
          <a href="/dashboard">Dashboard</a>
          <span>{" | "}</span>
          <Counter />
        </nav>
        {props.children}
      </div>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Root Counter {count}
    </button>
  );
}
