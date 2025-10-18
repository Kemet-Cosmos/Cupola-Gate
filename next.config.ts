import { withGTConfig } from "gt-next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
};

export default withGTConfig(nextConfig, {
  // Additional GT configuration options
});
