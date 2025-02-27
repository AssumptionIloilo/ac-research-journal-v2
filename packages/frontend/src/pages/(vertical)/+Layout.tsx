import VerticalLayout from "@/components/layouts/vertical-layout";
import { PropsWithChildren } from "react";

export default function RootLayout(props: PropsWithChildren) {
  return <VerticalLayout>{props.children}</VerticalLayout>;
}
