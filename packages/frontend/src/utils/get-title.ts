const TITLE_TEMPLATE = "%s | AC Publications";

export default function getTitle(title: string = "Home") {
  return TITLE_TEMPLATE.replace("%s", title);
}
