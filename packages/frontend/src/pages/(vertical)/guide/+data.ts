import { pageRoutes } from "@/constants/page-routes";
import { redirect } from "vike/abort";
import { PageContext } from "vike/types";

export function data(_pageContext: PageContext) {
  // Run a query, if no. stay.

  // If there is
  if (false) {
    throw redirect(pageRoutes.guide + "/" + "that-page-slug");
  }
}
