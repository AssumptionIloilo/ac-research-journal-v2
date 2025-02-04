import ArchiveLayout from "@/components/layouts/archive-layout";
import { PropsWithChildren } from "react";

export default function ArchiveLayoutL(props: PropsWithChildren) {
  return <ArchiveLayout>{props.children}</ArchiveLayout>;
}
