import { withGTConfig } from "gt-next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "C:\\Users\\Apolo\\Coding\\Cupola-Gate",
  },
};

export default withGTConfig(nextConfig, {
  // Additional GT configuration options
});
