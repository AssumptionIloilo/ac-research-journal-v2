import getTitle from "@/utils/get-title";
import { useMetadata } from "vike-metadata-react";

export default function GuidelinesOverviewPage() {
  useMetadata({
    title: getTitle("Guidelines"),
  });

  return (
    <div className="pt-20">
      No guidelines found. Please write some guidelines on the admin page.
    </div>
  );
}
