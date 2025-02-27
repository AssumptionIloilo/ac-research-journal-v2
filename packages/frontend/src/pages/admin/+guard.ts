import { redirect } from "vike/abort";

export function guard() {
  throw redirect("http://localhost:8090/admin");
}
