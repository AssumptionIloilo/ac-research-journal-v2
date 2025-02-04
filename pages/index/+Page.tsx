import getTitle from "@/utils/get-title";
import { useState } from "react";
import { useMetadata } from "vike-metadata-react";

export default function Page() {
  useMetadata({
    title: getTitle("Home"),
  });

  return (
    <>
      <div>
        <h1>My Vike + Solid app</h1>
        This page is:
        <ul>
          <li>Rendered to HTML.</li>
          <li>
            Interactive. <Counter />
          </li>
        </ul>
      </div>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  );
}
