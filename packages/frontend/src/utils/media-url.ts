import { publicConfig } from "@/config.public";

export function mediaUrl(relativePath?: string | null) {
  if (!relativePath) return undefined;

  return `${publicConfig.CMS_ENDPOINT}${relativePath}`;
}
