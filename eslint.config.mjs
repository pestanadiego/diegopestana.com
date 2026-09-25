import { plugin as shadcn } from "@shadcn/lint";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
  {
    rules: { "react/no-unescaped-entities": "off" },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { shadcn },
    settings: {
      shadcn: {
        ui: "@/components/ui",
        note: "Read DESIGN.md for tokens, components, and approved patterns before adding new styles.",
      },
    },
    rules: {
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          message: {
            spacing:
              "<{{component}}> owns its padding. Use margin on it or gap on the parent. Add a new pattern to {{file}} and DESIGN.md only if the design calls for it.",
            default:
              "<{{component}}> owns its {{category}}. Use a variant ({{variants|none defined}}) or add one to {{file}} and document it in DESIGN.md.",
          },
        },
      ],
      "shadcn/no-raw-colors": ["error", { message: "Use a color token from {{file}}: {{tokens}}." }],
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-inline-styles": "error",
      "shadcn/no-unknown-classes": "error",
      "shadcn/require-static-classes": "error",
    },
  },
  {
    files: ["components/ui/**"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/require-static-classes": "off",
    },
  },
]);
