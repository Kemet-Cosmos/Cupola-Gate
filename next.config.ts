import { withGTConfig } from "gt-next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "C:\\Users\\Apolo\\Coding\\CupolaGate",
  },
};

export default withGTConfig(nextConfig, {
  // Additional GT configuration options
});
