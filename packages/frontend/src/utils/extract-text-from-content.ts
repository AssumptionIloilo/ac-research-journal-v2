type Node = {
  children?: Node[];
  text?: string;
  type?: string;
  detail?: number;
  format?: number;
  mode?: string;
  style?: string;
  version?: number;
  direction?: string;
  indent?: number;
  textFormat?: number;
  textStyle?: string;
};

/**
 * Utility for extracting text from content in order to get the
 * number of words later.
 */
export function extractTextFromContent(content: { root: Node }): string[] {
  const texts: string[] = [];

  function extractText(node: Node): void {
    if (node.text) {
      texts.push(node.text);
    }
    if (node.children) {
      node.children?.forEach((child) => extractText(child));
    }
  }

  extractText(content.root);

  return texts;
}
