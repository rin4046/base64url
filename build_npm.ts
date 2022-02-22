import { build, emptyDir } from "https://deno.land/x/dnt@0.20.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  package: {
    name: "@rin4046/base64url",
    version: Deno.args[0],
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/rin4046/base64url.git",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
