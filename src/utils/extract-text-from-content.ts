type Node = {
  children?: Node[];
  text?: string;
  type?: string; // not used
  newTab?: boolean; // not used
  url?: string | null; // not used
};

/**
 * Utility for extracting text from content in order to get the
 * number of words later.
 */
export function extractTextFromContent(content: Node[]): string[] {
  const texts: string[] = [];

  function extractText(node: Node): void {
    if (node.text) {
      texts.push(node.text);
    }
    if (node.children) {
      node.children?.forEach((child) => extractText(child));
    }
  }

  content?.forEach((node) => extractText(node));

  return texts;
}
