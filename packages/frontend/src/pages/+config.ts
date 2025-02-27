import config from "vike-react/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
  // stream: "web", // If customer-server.
  stream: true, // If standalone.
  extends: config,
} satisfies Config;
