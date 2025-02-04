import GuideLayout from "@/components/layouts/guide-layout";
import { PropsWithChildren } from "react";

export default function GuideLayoutL(props: PropsWithChildren) {
  return <GuideLayout>{props.children}</GuideLayout>;
}
