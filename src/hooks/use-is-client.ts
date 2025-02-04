/**
 * Not a hook. It's more like it checks if window exists. If window doesn't
 * exist, this is server-side. = False
 *
 * If window exists, it is client-side. = True
 */
export default function isClient() {
  return typeof window !== "undefined";
}
