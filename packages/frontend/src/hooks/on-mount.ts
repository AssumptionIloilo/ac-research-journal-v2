import { useEffect } from "react";

export async function onMount(callback: (() => void) | (() => Promise<void>)) {
  useEffect(() => {
    callback();
  }, []);
}
