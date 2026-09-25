import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"]],
  },
});

export default withMDX(nextConfig);
